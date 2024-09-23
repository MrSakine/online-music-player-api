import { IMusicAlbum } from './imusic-album.interface';

export interface IMusicSingle extends IMusicAlbum {
  tracks: string[];
}
