import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { IMusicFile } from 'src/interfaces/imusic-file.interface';
import { IMusicSingle } from 'src/interfaces/imusic-single.interface';
import { MusicAlbumObject } from 'src/objects/music-album.object';
import { MusicFileAlbumObject } from 'src/objects/music-file-album.object';
import { MusicObject } from 'src/objects/music.object';

@Injectable()
export class MusicFilesUtils {
  musics: MusicObject;

  constructor() {}

  async load(path: string = '') {
    const data = await readFile(path, { encoding: 'utf-8' });
    const musicFile = JSON.parse(data) as IMusicFile<
      MusicFileAlbumObject,
      IMusicSingle
    >;

    this.musics = new MusicObject();
    this.musics.assets = musicFile.assets;
    this.musics.singles = musicFile.singles;
    this.musics.albums = this.getAlbumObject(musicFile);

    console.log(`Music database => ${JSON.stringify(this.musics)}`);
  }

  getAlbumObject(
    musicFile: IMusicFile<MusicFileAlbumObject, IMusicSingle>,
  ): Array<MusicAlbumObject> {
    return musicFile.albums.map((e) => {
      const albumObject = new MusicAlbumObject();
      albumObject.key = e.key;
      albumObject.title = e.title;
      albumObject.poster = e.poster;
      albumObject.total = e.total;

      const path = `${musicFile.assets.path}/${musicFile.assets.albums}/${e.key.toLowerCase()}`;
      const albumFiles = readdirSync(path);
      albumObject.tracks = albumFiles
        .map((x, i) => {
          if (x.includes('.mp3')) {
            const title = x.substring(3).split('.')[0];
            return {
              title: title,
              file: `${x}`,
              index: i + 1,
            };
          }
        })
        .filter((e) => e != null);

      return albumObject;
    });
  }
}
