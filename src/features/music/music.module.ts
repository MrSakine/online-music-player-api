import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { SharedModule } from 'src/core/shared.module';
import { MusicFilesUtils } from 'src/utils/music-file.utils';

@Module({
  imports: [SharedModule],
  controllers: [MusicController],
  providers: [MusicService, MusicFilesUtils],
})
export class MusicModule {}
