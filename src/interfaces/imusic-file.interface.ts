import { IMusicAlbum } from './imusic-album.interface';
import { IMusicSingle } from './imusic-single.interface';
import { IMusicAsset } from './imusic-asset.interface';

export interface IMusicFile<T extends IMusicAlbum, G extends IMusicSingle> {
  assets: IMusicAsset;
  albums: Array<T>;
  singles: Array<G>;
}
