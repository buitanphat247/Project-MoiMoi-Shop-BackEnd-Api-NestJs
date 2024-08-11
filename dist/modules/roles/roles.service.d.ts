import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { UserInterface } from '../users/users.interface';
import mongoose from 'mongoose';
export declare class RolesService {
    private RoleModel;
    constructor(RoleModel: SoftDeleteModel<RoleDocument>);
    create(createRoleDto: CreateRoleDto, user: UserInterface): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findAll(qs: string): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    findOne(_id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(_id: string, updateRoleDto: UpdateRoleDto, user: UserInterface): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: UserInterface): Promise<string>;
}
