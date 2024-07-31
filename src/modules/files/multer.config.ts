import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
const isExistPath = (path: string) => {};

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    const upload_path = this.configService.get<string>('PATH_UPLOAD_FILE');
    return {
      storage: diskStorage({
        destination: function (req, file, cb) {
          const { folder_type } = req.headers;
          const uploadPath = folder_type
            ? upload_path + `/${folder_type}`
            : upload_path + '/file';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true }); // Use { recursive: true } to create nested directories if needed
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    };
  }
}
