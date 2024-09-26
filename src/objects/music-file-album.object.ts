import { IMusicSingle } from 'src/interfaces/imusic-single.interface';

export class MusicFileAlbumObject implements IMusicSingle {
  duration: number;
  key: string;
  title: string;
  tracks: Array<string>;
  poster: string;
  total: number;
}
