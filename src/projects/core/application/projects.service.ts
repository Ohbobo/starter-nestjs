import { IProjectsRepository } from "../repository/projects.repository";
import { IProjectCard } from "../interface/projects.interface";
import { ProjectDto } from "../dto/projects.dto";
import { v4 as uuidv4 } from 'uuid';

export class ProjectsService {
    constructor(private readonly projectsRepository: IProjectsRepository) {}

    async getAllProjects(): Promise<IProjectCard[]> {
        return this.projectsRepository.getAllProjects()
    }

    async getOneProject(id: string): Promise<IProjectCard> {
        return this.projectsRepository.findById(id);
    }

    async createProject(createProjectDto: ProjectDto): Promise<IProjectCard> {
        const newProject : IProjectCard = {
            _id: uuidv4(),
            ...createProjectDto,
        }
        const createProject = await this.projectsRepository.createProject(newProject)
        return createProject;
    }

    async updateProject(id: string, updateProjectDto: ProjectDto): Promise<IProjectCard> {
        try {
          const findProjectById = await this.projectsRepository.findById(id);
          if (!findProjectById) {
            throw new Error('Projet introuvable');
          }
      
          const updatedProject = { ...findProjectById, ...updateProjectDto };
          await this.projectsRepository.updateProject(updatedProject);
          return updatedProject;
        } catch (error) {
          throw new Error("Une erreur s'est produite lors de la mise à jour du projet : " + error.message);
        }
      }

    async deleteProject(id: string): Promise<void> {
        const findProjectById = await this.projectsRepository.findById(id);
        await this.projectsRepository.deleteProject(id);
    }
}