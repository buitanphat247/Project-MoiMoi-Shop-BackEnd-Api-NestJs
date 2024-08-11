import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
export declare class MulterConfigService implements MulterOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createMulterOptions(): MulterModuleOptions;
}
