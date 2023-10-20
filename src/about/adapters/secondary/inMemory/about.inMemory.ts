import { Injectable } from '@nestjs/common'
import { CreateAboutCard, UpdateAboutCardDto } from 'src/about/core/dto/about.dto';
import { IAboutCard } from 'src/about/core/interface/about.inteface';
import { IAboutCardsRepository } from 'src/about/core/repository/about.repository';


@Injectable()
export class InMemoryAboutCards implements IAboutCardsRepository {
    private readonly aboutCards: IAboutCard[] = [];

    async getAllCard(): Promise<IAboutCard[]> {
        return this.aboutCards;
    }

    async findById(id: string): Promise<IAboutCard> {
        return this.aboutCards.find(card => card._id === id);
    }

    async createCard(createCardDto: CreateAboutCard): Promise<IAboutCard> {
        const newCard = {_id: "1", ...createCardDto};
        this.aboutCards.push(newCard);
        return newCard;
    }

    async updateCard(aboutCard: IAboutCard): Promise<void> {
        const index = this.aboutCards.findIndex(card => card._id === aboutCard._id);
        if(index === -1) {
            return undefined;
        }
        this.aboutCards[index] = aboutCard;
    }

    async deleteCard(id: string): Promise<void> {
        const index = this.aboutCards.findIndex(card => card._id === id);

        if(index !== -1) {
            this.aboutCards.splice(index, 1);
        }
    }
}