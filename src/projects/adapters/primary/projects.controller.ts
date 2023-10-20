import { Body, Delete, Get, NotFoundException, Param, Put, UploadedFile, UseInterceptors, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ProjectsService } from 'src/projects/core/application/projects.service';
import { ProjectDto } from 'src/projects/core/dto/projects.dto';
import { IProjectCard } from 'src/projects/core/interface/projects.interface';
import { AuthGuard } from 'src/admin/adapters/secondary/middleware/authGuard/Auth.guard';

@Controller('projects')
export class ProjectController{
    constructor(private readonly projectsService : ProjectsService) {}

    @Get()
    async getAllProjects(): Promise<IProjectCard[]> {
        return this.projectsService.getAllProjects();
    }

    @Get(':id')
    async getOneProjects(@Param('id') id: string): Promise<IProjectCard> {
        const getProjectById = await this.projectsService.getOneProject(id);

        if(!getProjectById) {
            throw new NotFoundException('projet non trouvé')
        }

        return getProjectById;
    }

    @Post()
    @UseGuards(AuthGuard)
        async createProject(@Body() createProjectDto: ProjectDto): Promise<IProjectCard> {
            try {
                const newProject = await this.projectsService.createProject(createProjectDto);
                console.log(newProject)
                return newProject;
            } catch (error) {
                throw new BadRequestException("Erreur lors du redimensionnement de l'image");
            }
    }


    @Put(':id')
    async updateProject(@Param('id') id: string, @Body() updateDto: ProjectDto): Promise<void> {
        try {
            const updatedProjects = await this.projectsService.updateProject(id, updateDto)
            updatedProjects;
        } catch (error) {
            throw new BadRequestException("Erreur lors de la modification");
        }
        
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProject(@Param('id') id: string): Promise<void> {
        await this.projectsService.deleteProject(id);
    }
}
