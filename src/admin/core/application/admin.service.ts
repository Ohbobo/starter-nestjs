import { IAdminRepository } from "../repository/admin.repository";
import { ResposonseAdminDto } from "../dto/admin.dto";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotven from 'dotenv';
import { IAdmin } from "../interface/admin.interface";

dotven.config();

export class AdminService {
    constructor(private readonly adminRepository: IAdminRepository) {}

    async create(email: string, password: string): Promise<IAdmin> {
        const hash = await bcrypt.hash(password, 10);
        const admin: IAdmin = {
            email,
            password: hash
        }
        return await this.adminRepository.createAdmin(admin);
    }

    async login(email: string, password: string): Promise<ResposonseAdminDto | null> {
        const adminUser = await this.adminRepository.getUserByEmail(email);
        const passwordMatch = await bcrypt.compare(password, adminUser.password);

        if(!adminUser || !passwordMatch){
            return null;
        }

        const token = jwt.sign({ userId: adminUser.adminId }, process.env.JWT_KEY, { expiresIn: '24h' });
        return { adminId: adminUser.adminId, token }
    }
}
