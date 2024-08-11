import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../users/users.interface';
import { ConfigService } from '@nestjs/config';
import { Request as ExpressRequest, Response } from 'express';
import { RolesService } from '../roles/roles.service';
export declare class AuthsService {
    private usersService;
    private jwtService;
    private config;
    private roleService;
    constructor(usersService: UsersService, jwtService: JwtService, config: ConfigService, roleService: RolesService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: UserInterface, res: Response): Promise<{
        access_token: string;
        meta: {
            _id: import("mongoose").Schema.Types.ObjectId;
            email: string;
            role: {
                _id: import("mongoose").ObjectId;
                name: string;
            };
            username: string;
            address: string;
            age: string;
            phone: string;
            gender: string;
            permissions: [];
        };
    }>;
    createRefresthToken(payload: any): Promise<string>;
    createAccessToken(payload: any): Promise<string>;
    processNewToken(req: ExpressRequest, res: Response): Promise<{
        access_token: string;
        meta: {
            _id: import("mongoose").Types.ObjectId;
            username: string;
            email: string;
            role: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    logout(response: Response, user: UserInterface): Promise<string>;
}
