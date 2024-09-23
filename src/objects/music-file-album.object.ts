import { IMusicSingle } from 'src/interfaces/imusic-single.interface';

export class MusicFileAlbumObject implements IMusicSingle {
  key: string;
  title: string;
  tracks: Array<string>;
  poster: string;
  total: number;
}
