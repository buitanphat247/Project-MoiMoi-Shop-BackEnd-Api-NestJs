import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { UserInterface } from '../users/users.interface';
export declare class PermissionsService {
    private PermissionModel;
    constructor(PermissionModel: SoftDeleteModel<PermissionDocument>);
    create(createPermissionDto: CreatePermissionDto, user: UserInterface): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    createMany(createPermissions: any, user: UserInterface): Promise<void>;
    findAll(): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    findOne(_id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(_id: string, updatePermissionDto: UpdatePermissionDto, user: UserInterface): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    delete(_id: string, user: UserInterface): Promise<string>;
}
