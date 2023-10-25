import { Injectable } from '@nestjs/common'
import { ProjectDto } from 'src/projects/core/dto/projects.dto';
import { IProjectCard } from 'src/projects/core/interface/projects.interface';
import { IProjectsRepository } from 'src/projects/core/repository/projects.repository';

@Injectable()
export class InMemoryProjects implements IProjectsRepository {
    private readonly projects: IProjectCard[] = [];

    async findById(id: string): Promise<IProjectCard> {
        return this.projects.find(p => p._id === id);
    }

    async getAllProjects(): Promise<IProjectCard[]> {
        return this.projects;
    }
    
    async createProject(projectDto: ProjectDto): Promise<IProjectCard> {
        const newProject = {_id: "", ...projectDto};
        this.projects.push(newProject);
        return newProject;
    }

    async updateProject(id: string, project: IProjectCard): Promise<IProjectCard> {
        const projectIndex = this.projects.findIndex(p => p._id === id);
    
        if (projectIndex !== -1) {
            this.projects[projectIndex] = {
                ...project,
                _id: id,
            };
            return this.projects[projectIndex];
        } else {
            throw new Error('Projet introuvable pour la mise à jour');
        }
    }

    async deleteProject(id: string): Promise<void> {
        const index = this.projects.findIndex(p => p._id === id);
    
        if(index !== -1) {
            this.projects.splice(index, 1);
        }
    }    
}