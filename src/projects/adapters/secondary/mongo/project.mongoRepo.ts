import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ProjectEntities } from './project.schema';
import { IProjectCard } from 'src/projects/core/interface/projects.interface';
import { IProjectsRepository } from 'src/projects/core/repository/projects.repository';
import { ProjectDto } from 'src/projects/core/dto/projects.dto';

@Injectable()
export class MongooseProjectRepository implements IProjectsRepository {
    constructor(@InjectModel('projects') private readonly projectModel: Model<ProjectEntities>) {}

    async getAllProjects(): Promise<IProjectCard[]> {
        return this.projectModel.find();    
    }

    async findById(id: string): Promise<IProjectCard> {
        return this.projectModel.findById(id)    
    }

    async createProject(projectDto: ProjectDto): Promise<IProjectCard> {
        const newProjectCard = new this.projectModel({
            ...projectDto,
            _id: new mongoose.Types.ObjectId()
        });
        const saveNewCard = await newProjectCard.save();
        return saveNewCard.toJSON() as IProjectCard;    
    }

    async updateProject(project: IProjectCard): Promise<void> {
        try {
            const updatedCard = await this.projectModel.findByIdAndUpdate(project._id, project, { new: true }).exec();
            if(!updatedCard){
                throw new Error('Element introuvable pour la mise à jour');
            }
            updatedCard.toObject() as IProjectCard;
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }    
    }

    async deleteProject(id: string): Promise<void> {
        await this.projectModel.findByIdAndRemove(id).exec()    
    }
}