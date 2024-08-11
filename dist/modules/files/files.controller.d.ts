import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';
export declare class FilesController {
    private readonly filesService;
    private readonly configService;
    constructor(filesService: FilesService, configService: ConfigService);
    uploadFile(file: Express.Multer.File): {
        name: string;
    };
    delete(fileName: string, folderType: string): boolean;
}
