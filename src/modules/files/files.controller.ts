import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import fs, { unlinkSync } from 'fs';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorator/customize';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file_content'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      name: file.filename,
    };
  }

  @Public()
  @Delete()
  delete(
    @Query('name') fileName: string,
    @Query('folder_type') folderType: string,
  ) {
    const upload_path = this.configService.get<string>('PATH_UPLOAD_FILE');
    const uploadPath = folderType
      ? upload_path + `/${folderType}/${fileName}`
      : upload_path + `/file/${fileName}`;
    console.log('uploadPath: ', uploadPath);
    try {
      unlinkSync(`${uploadPath}`);
    } catch (error) {
      console.log(error);
    }
    return true;
  }
}
