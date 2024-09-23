import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseUtils } from 'src/utils/response.utils';
import { createReadStream } from 'fs';
import { MusicAlbumObject } from 'src/objects/music-album.object';
import { IMusicSingle } from 'src/interfaces/imusic-single.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @UseGuards(AuthGuard)
  @Get('albums')
  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({ description: 'All albums or one album information' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @HttpCode(HttpStatus.OK)
  async getAlbums(@Query('name') name: string) {
    if (name) {
      const album = await this.musicService.findAlbum(name);
      if (!album) {
        throw new HttpException(`Album not found`, HttpStatus.NOT_FOUND);
      }
      return this.responseUtils.dataResponse('Album information', album);
    }

    const albums = await this.musicService.getAllAlbums();
    return this.responseUtils.dataArrayResponse('All albums', albums);
  }

  @UseGuards(AuthGuard)
  @Get('singles')
  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({ description: 'All singles or one single information' })
  @ApiNotFoundResponse({ description: 'Single not found' })
  @HttpCode(HttpStatus.OK)
  async getSingles(@Query('name') name: string) {
    if (name) {
      const single = await this.musicService.findSingle(name);
      if (!single)
        throw new HttpException(`Single not found`, HttpStatus.NOT_FOUND);
      return this.responseUtils.dataResponse('Single information', single);
    }

    const singles = await this.musicService.getAllSingles();
    return this.responseUtils.dataArrayResponse('All singles', singles);
  }

  @UseGuards(AuthGuard)
  @Get('poster')
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ApiBadRequestResponse({ description: 'Invalid type' })
  @ApiOkResponse({ description: 'A new stream file' })
  @HttpCode(HttpStatus.OK)
  async getPoster(
    @Query('type') type: string,
    @Query('name') name: string,
  ): Promise<StreamableFile> {
    let data: any;
    let path: string;
    let filename: string;

    const assets = await this.musicService.getAssets();

    switch (type) {
      case 'album':
        data = await this.musicService.findAlbum(name);
        if (!data)
          throw new HttpException(`Album not found`, HttpStatus.NOT_FOUND);
        const album = data as MusicAlbumObject;
        path = `${assets.path}/${assets.albums}/${album.key.toLowerCase()}/${album.poster}`;
        filename = album.poster;
        break;
      case 'single':
        data = await this.musicService.findSingle(name);
        if (!data)
          throw new HttpException(`Single not found`, HttpStatus.NOT_FOUND);
        const single = data as IMusicSingle;
        path = `${assets.path}/${assets.singles}/${single.key.toLowerCase()}/${single.poster}`;
        filename = single.poster;
        break;
      default:
        throw new HttpException('Invalid type', HttpStatus.BAD_REQUEST);
    }

    const stream = new StreamableFile(createReadStream(path), {
      type: 'image/jpeg',
      disposition: `inline; filename="${filename}"`,
    });

    return stream;
  }

  @UseGuards(AuthGuard)
  @Get('file')
  @ApiQuery({ name: 'index', required: false })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ApiBadRequestResponse({ description: 'Invalid type' })
  @ApiOkResponse({ description: 'A new stream file' })
  @HttpCode(HttpStatus.OK)
  async getFile(
    @Query('type') type: string,
    @Query('name') name: string,
    @Query('index') index: number = 1,
  ) {
    let data: any;
    let path: string;

    const assets = await this.musicService.getAssets();

    switch (type) {
      case 'album':
        data = await this.musicService.findAlbum(name);
        if (!data)
          throw new HttpException(`Album not found`, HttpStatus.NOT_FOUND);
        const album = data as MusicAlbumObject;
        path = `${assets.path}/${assets.albums}/${album.key.toLowerCase()}/`;
        const track = album.tracks.find((e) => e.index == index);
        if (!track || index > album.total)
          throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
        path += `${track.file}`;
        break;
      case 'single':
        data = await this.musicService.findSingle(name);
        if (!data)
          throw new HttpException(`Single not found`, HttpStatus.NOT_FOUND);
        const single = data as IMusicSingle;
        path = `${assets.path}/${assets.singles}/${single.key.toLowerCase()}/${single.tracks[0]}`;
        break;
      default:
        throw new HttpException('Invalid type', HttpStatus.BAD_REQUEST);
    }

    const stream = new StreamableFile(createReadStream(path), {
      type: 'audio/mp3',
      disposition: 'inline; filename="audio.mp3"',
    });

    return stream;
  }
}
