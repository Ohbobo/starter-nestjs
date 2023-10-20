export class CreateAboutCard {
    title: string;
    technologies: CreateTechnoDto[];
}

export class CreateTechnoDto {
    id: string;
    name: string;
    icon: string;
}

export class UpdateAboutCardDto {
    title: string;
    technologies: CreateTechnoDto[];
}