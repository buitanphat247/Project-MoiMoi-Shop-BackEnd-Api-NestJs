import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserInterface } from 'src/modules/users/users.interface';
import { RolesService } from 'src/modules/roles/roles.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private rolesService;
    constructor(configService: ConfigService, rolesService: RolesService);
    validate(payload: UserInterface): Promise<{
        permissions: import("mongoose").Schema.Types.ObjectId[];
        _id: import("mongoose").ObjectId;
        username: string;
        email: string;
        phone: string;
        address: string;
        age: string;
        gender: string;
        role: {
            _id: import("mongoose").ObjectId;
            name: string;
        };
    }>;
}
export {};
