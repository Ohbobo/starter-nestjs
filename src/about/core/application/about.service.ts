import { IAboutCard } from "../interface/about.inteface";
import { CreateAboutCard, UpdateAboutCardDto } from "../dto/about.dto";
import { IAboutCardsRepository } from "../repository/about.repository";

export class AboutCardsService {
    constructor(private readonly aboutCardsRepository: IAboutCardsRepository) {}

    async getAllCard(): Promise<IAboutCard[]> {
        return this.aboutCardsRepository.getAllCard();
    }

    async getOne(id: string): Promise<IAboutCard> {
        return this.aboutCardsRepository.findById(id)
    }

    async createCard(createCardDto: CreateAboutCard): Promise<IAboutCard> {
        const newCard: IAboutCard = {
            _id: "1",
            ...createCardDto
        }
        const createCard = await this.aboutCardsRepository.createCard(newCard);
        return createCard;
    }

    async updateBook(id: string, updateAboutCardDto: UpdateAboutCardDto): Promise<void> {
        const findCardById = await this.aboutCardsRepository.findById(id);
        const updatedCard = { ...findCardById, ...updateAboutCardDto };

        await this.aboutCardsRepository.updateCard(updatedCard);
    }

    async deleteCard(id: string): Promise<void> {
        const findCardById = await this.aboutCardsRepository.findById(id);
        await this.aboutCardsRepository.deleteCard(id);
    }
}