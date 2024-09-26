import { Injectable } from '@nestjs/common';
import { readdir, readFile } from 'fs/promises';
import getAudioDurationInSeconds from 'get-audio-duration';
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
    this.musics.singles = await this.formatSingle(musicFile);
    this.musics.albums = await this.formatAlbum(musicFile);

    console.log(`Music database => ${JSON.stringify(this.musics)}`);
  }

  async formatAlbum(
    musicFile: IMusicFile<MusicFileAlbumObject, IMusicSingle>,
  ): Promise<Array<MusicAlbumObject>> {
    const filteredAlbums = await Promise.all(
      musicFile.albums.map(async (e) => {
        const albumObject = new MusicAlbumObject();
        albumObject.key = e.key;
        albumObject.title = e.title;
        albumObject.poster = e.poster;
        albumObject.total = e.total;

        const path = `${musicFile.assets.path}/${musicFile.assets.albums}/${e.key.toLowerCase()}`;
        const albumFiles = await readdir(path);
        albumObject.tracks = await this.formatTrack(path, albumFiles);
        albumObject.tracks = albumObject.tracks.filter(
          (track) => track !== null,
        );
        albumObject.duration = albumObject.tracks.reduce((total, track) => {
          return total + Number(track.duration);
        }, 0);
        return albumObject;
      }),
    );
    return filteredAlbums;
  }

  async formatTrack(path: string, albums: string[]) {
    const formatedTracks = Promise.all(
      albums.map(async (x, i) => {
        if (x.includes('.mp3')) {
          const title = x.substring(3).split('.')[0];
          const duration = await getAudioDurationInSeconds(`${path}/${x}`);
          return {
            title: title,
            file: `${x}`,
            duration: duration,
            index: i + 1,
          };
        }

        return null;
      }),
    );
    return formatedTracks;
  }

  async formatSingle(
    musicFile: IMusicFile<MusicFileAlbumObject, IMusicSingle>,
  ): Promise<Array<IMusicSingle>> {
    const formattedSingles = await Promise.all(
      musicFile.singles.map(async (e) => {
        const path = `${musicFile.assets.path}/${musicFile.assets.singles}/${e.key.toLowerCase()}/${e.tracks[0]}`;
        const duration = await getAudioDurationInSeconds(path);
        e.duration = duration;
        return e;
      }),
    );
    return formattedSingles;
  }
}
