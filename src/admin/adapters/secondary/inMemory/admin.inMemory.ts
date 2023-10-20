import { Injectable } from '@nestjs/common';
import { IAdminRepository } from 'src/admin/core/repository/admin.repository';
import { IAdmin } from 'src/admin/core/interface/admin.interface';

@Injectable()
export class InMemoryAdmin implements IAdminRepository {
    private readonly admin: IAdmin[] = []

    async createAdmin(admin: IAdmin): Promise<IAdmin> {
        const existingAdmin = await this.getUserByEmail(admin.email);
        if(existingAdmin){
            throw new Error('Cet email existe déjà');
        }
        this.admin.push(admin);
        return admin;
    }

    async getUserByEmail(email: string): Promise<IAdmin> {
        return this.admin.find(t => t.email === email) || null;
    }
}