import { Injectable } from '@nestjs/common';
import { MusicFilesUtils } from 'src/utils/music-file.utils';

@Injectable()
export class MusicService {
  constructor(private readonly musicFilesUtils: MusicFilesUtils) {}

  async getAllAlbums() {
    return this.musicFilesUtils.musics.albums;
  }

  async getAllSingles() {
    return this.musicFilesUtils.musics.singles;
  }

  async getAssets() {
    return this.musicFilesUtils.musics.assets;
  }

  async findAlbum(name: string) {
    return this.musicFilesUtils.musics.albums.find(
      (e) => e.key.toLowerCase() === name.toLowerCase(),
    );
  }

  async findSingle(name: string) {
    return this.musicFilesUtils.musics.singles.find(
      (e) => e.key.toLowerCase() === name.toLowerCase(),
    );
  }
}
