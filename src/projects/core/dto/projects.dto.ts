export class ProjectDto {
    title: string;
    description: string;
    link: string;
    tags: TagsDto[];
}

export class TagsDto {
    id: string;
    name: string;
}