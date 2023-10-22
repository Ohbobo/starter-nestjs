import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.mongo.entities';
import { IAdmin } from 'src/admin/core/interface/admin.interface';
import { IAdminRepository } from 'src/admin/core/repository/admin.repository';

@Injectable()
export class MongooseAdminRepository implements IAdminRepository {
    constructor(@InjectModel('admin') private readonly adminModel: Model<Admin>) {}

    async getUserByEmail(email: string): Promise<IAdmin> {
        const admin = await this.adminModel.findOne({ email }).exec()
        if(admin){
            return {
                email: admin.email,
                password: admin.password,
            }
        }
        return null
    }

    async createAdmin(admin: IAdmin): Promise<IAdmin> {
        return await this.adminModel.create(admin);    
    }
}