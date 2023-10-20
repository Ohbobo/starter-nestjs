import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { IAdmin } from 'src/admin/core/interface/admin.interface';
import { IAdminRepository } from 'src/admin/core/repository/admin.repository';
import { AdminDto, ResposonseAdminDto } from 'src/admin/core/dto/admin.dto';
import { AdminService } from 'src/admin/core/application/admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @Post('signup')
    async create(@Body() adminDto: AdminDto): Promise<IAdmin> {
        try {
            const { email, password } = adminDto;
            return await this.adminService.create(email, password);
        } catch (error) {
            throw new Error('Erreur lors de l\'inscription : ' + error.message);
        }
    }

    @Post('login')
    async login(@Body() admindto: AdminDto): Promise<ResposonseAdminDto | null> {
        try {
            const { email, password } = admindto;
            const admin = await this.adminService.login(email, password);

            if(!admin){
                throw new UnauthorizedException('invalide');
            }
            return admin;
        } catch (error) {
            throw new Error('Erreur lors de la connexion : ' + error.message);
        }
    }
}