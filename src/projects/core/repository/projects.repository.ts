import { ProjectDto } from "../dto/projects.dto";
import { IProjectCard } from "../interface/projects.interface"

export interface IProjectsRepository {
    findById(id: string): Promise<IProjectCard>;
    getAllProjects(): Promise<IProjectCard[]>;
    createProject(projectDto: ProjectDto):Promise<IProjectCard>;
    updateProject(project: IProjectCard): Promise<void>;
    deleteProject(id: string): Promise<void>;
}