import { IMusicAlbum } from 'src/interfaces/imusic-album.interface';
import { IMusicAsset } from 'src/interfaces/imusic-asset.interface';
import { IMusicFile } from 'src/interfaces/imusic-file.interface';
import { IMusicSingle } from 'src/interfaces/imusic-single.interface';

export class MusicFileObject implements IMusicFile<IMusicAlbum, IMusicSingle> {
  assets: IMusicAsset;
  albums: IMusicAlbum[];
  singles: IMusicSingle[];
}
