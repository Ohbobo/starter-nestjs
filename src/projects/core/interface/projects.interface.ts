export interface IProjectCard {
    _id: string;
    title: string;
    description: string;
    link: string;
    issue: string;
    resolution: string;
    tags: ITags[];
}

export interface ITags {
    id: string
    name: string
}