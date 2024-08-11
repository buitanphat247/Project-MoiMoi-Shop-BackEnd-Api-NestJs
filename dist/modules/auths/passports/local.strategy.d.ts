import { Strategy } from 'passport-local';
import { AuthsService } from '../auths.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthsService);
    validate(username: string, password: string): Promise<any>;
}
export {};
