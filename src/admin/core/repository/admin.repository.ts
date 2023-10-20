import { IAdmin } from "../interface/admin.interface";

export interface IAdminRepository {
    getUserByEmail(email: string): Promise<IAdmin>;
    createAdmin(admin: IAdmin): Promise<IAdmin>
}