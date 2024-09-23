import { IMusicFile } from 'src/interfaces/imusic-file.interface';
import { MusicAlbumObject } from './music-album.object';
import { IMusicSingle } from 'src/interfaces/imusic-single.interface';
import { IMusicAsset } from 'src/interfaces/imusic-asset.interface';

export class MusicObject implements IMusicFile<MusicAlbumObject, IMusicSingle> {
  assets: IMusicAsset;
  albums: MusicAlbumObject[];
  singles: IMusicSingle[];
}
