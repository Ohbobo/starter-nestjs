export interface IAboutCard {
    _id: string;
    title: string;
    technologies: Technology[];
}

export interface Technology {
    id: string;
    name: string;
    icon: string;
}