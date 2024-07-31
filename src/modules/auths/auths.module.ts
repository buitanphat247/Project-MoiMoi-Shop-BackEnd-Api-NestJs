import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passports/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passports/jwt.strategy';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    RolesModule,
  ],
  controllers: [AuthsController],
  providers: [AuthsService, LocalStrategy, JwtStrategy],
})
export class AuthsModule {}
