import { Category, CategoryDocument } from './schema/category.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserInterface } from '../users/users.interface';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { updateCategoryDto } from './dto/update-categories.dto';
import mongoose from 'mongoose';
export declare class CategoriesService {
    private CategoryModel;
    constructor(CategoryModel: SoftDeleteModel<CategoryDocument>);
    findAll(qs: string, currentPage: number, limit: number): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Category> & Category & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Category> & Category & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(_id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Category> & Category & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Category> & Category & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    create(categoryDto: CreateCategoryDto, user: UserInterface): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Category> & Category & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Category> & Category & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(categoryDto: updateCategoryDto, user: UserInterface, _id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Category> & Category & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Category> & Category & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    delete(_id: string, user: UserInterface): Promise<string>;
}
