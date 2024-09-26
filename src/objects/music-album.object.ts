import { IMusicAlbum } from 'src/interfaces/imusic-album.interface';

export interface AlbumTrackObject {
  title: string;
  file: string;
  index: number;
  duration: number;
}

export class MusicAlbumObject implements IMusicAlbum {
  duration: number;
  key: string;
  title: string;
  poster: string;
  tracks: Array<AlbumTrackObject>;
  total: number;
}
