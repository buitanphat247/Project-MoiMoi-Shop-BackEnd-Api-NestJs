import { AuthsService } from './auths.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserInterface } from '../users/users.interface';
import { UsersService } from '../users/users.service';
import { Response, Request as ExpressRequest } from 'express';
export declare class AuthsController {
    private readonly authsService;
    private usersService;
    constructor(authsService: AuthsService, usersService: UsersService);
    login(req: any, res: Response): Promise<{
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
    create(userDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User> & import("../users/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User> & import("../users/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createMany(userList: any): Promise<boolean>;
    refresh(user: UserInterface, req: ExpressRequest, res: Response): Promise<{
        access_token: string;
        meta: {
            _id: import("mongoose").Types.ObjectId;
            username: string;
            email: string;
            role: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    handleGetAccount(user: UserInterface): Promise<UserInterface>;
    handleLogout(response: Response, user: UserInterface): Promise<string>;
}
