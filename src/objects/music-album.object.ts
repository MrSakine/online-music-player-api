import { IMusicAlbum } from 'src/interfaces/imusic-album.interface';

export interface AlbumTrackObject {
  title: string;
  file: string;
  index: number;
}

export class MusicAlbumObject implements IMusicAlbum {
  key: string;
  title: string;
  poster: string;
  tracks: Array<AlbumTrackObject>;
  total: number;
}
