import { Injectable } from '@nestjs/common';
import { IMusicSingle } from 'src/interfaces/imusic-single.interface';
import { MusicAlbumObject } from 'src/objects/music-album.object';
import { MusicFilesUtils } from 'src/utils/music-file.utils';

@Injectable()
export class MusicService {
  constructor(private readonly musicFilesUtils: MusicFilesUtils) {}

  async getAllAlbums() {
    return this.musicFilesUtils.musics.albums;
  }

  async formatAlbums(albums: Array<MusicAlbumObject>) {
    return albums.map((album) => {
      const albumCopy = {
        ...album,
        tracks: album.tracks.map((track) => ({ ...track })),
      };

      const name = albumCopy.key.toLowerCase();
      albumCopy.poster = `poster?type=album&name=${name}`;
      albumCopy.tracks = albumCopy.tracks.map((track) => {
        track.file = `file?type=album&name=${name}&index=${track.index}`;
        return track;
      });

      return albumCopy;
    });
  }

  async getAllSingles() {
    return this.musicFilesUtils.musics.singles;
  }

  async formatSingles(singles: Array<IMusicSingle>) {
    return singles.map((single) => {
      const singleCopy = {
        ...single,
        tracks: [...single.tracks],
      };

      const name = singleCopy.key.toLowerCase();
      singleCopy.tracks[0] = `file?type=single&name=${name}&index=`;
      singleCopy.poster = `poster?type=single&name=${name}`;

      return singleCopy;
    });
  }

  async getAssets() {
    return this.musicFilesUtils.musics.assets;
  }

  async findAlbum(name: string) {
    const albums = await this.getAllAlbums();
    return albums.find((e) => e.key.toLowerCase() === name.toLowerCase());
  }

  async findSingle(name: string) {
    const singles = await this.getAllSingles();
    return singles.find((e) => e.key.toLowerCase() === name.toLowerCase());
  }
}
