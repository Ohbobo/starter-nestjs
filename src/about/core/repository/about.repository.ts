import { IAboutCard } from "../interface/about.inteface";
import { CreateAboutCard, UpdateAboutCardDto } from "../dto/about.dto";

export interface IAboutCardsRepository {
    getAllCard(): Promise<IAboutCard[]>;
    createCard(createCardDto: CreateAboutCard): Promise<IAboutCard>;
    findById(id: string): Promise<IAboutCard>;
    updateCard(aboutCard: IAboutCard): Promise<void>;
    deleteCard(id: string): Promise<void>;
}