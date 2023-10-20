import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AboutEntities } from './about.schema';
import { IAboutCard } from 'src/about/core/interface/about.inteface';
import { IAboutCardsRepository } from 'src/about/core/repository/about.repository';
import { CreateAboutCard } from 'src/about/core/dto/about.dto';

@Injectable()
export class MongooseAboutRepository implements IAboutCardsRepository {
    constructor(@InjectModel('AboutEntities') private readonly aboutModel: Model<AboutEntities>) {}

    async getAllCard(): Promise<IAboutCard[]> {
        return this.aboutModel.find()
    }

    async findById(id: string): Promise<IAboutCard> {
        return this.aboutModel.findById(id)
    }

    async createCard(createCardDto: CreateAboutCard): Promise<IAboutCard> {
        const newAboutCard = new this.aboutModel({
            ...createCardDto,
            _id: new mongoose.Types.ObjectId()
        });
        console.log(newAboutCard)
        const saveNewCard = await newAboutCard.save();
        return saveNewCard.toJSON() as IAboutCard;
    }

    async updateCard(aboutCard: IAboutCard): Promise<void> {
        try {
            const updatedCard = await this.aboutModel.findByIdAndUpdate(aboutCard._id, aboutCard, { new: true }).exec()
            if(!updatedCard) {
                throw new Error('Element introuvable pour la mise à jour');
            }
            updatedCard.toObject() as IAboutCard
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    }

    async deleteCard(id: string): Promise<void> {
        await this.aboutModel.findByIdAndRemove(id).exec();
    }
}