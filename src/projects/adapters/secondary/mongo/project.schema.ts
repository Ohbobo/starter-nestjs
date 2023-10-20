import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema()
export class ProjectEntities {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;
    
    @Prop({required: true})
    link: string

    @Prop([{ 
        _id: false,
        id: { type: String, required: true },
        name: { type: String, required: true },
    }])
    tags: Array<{ id: string, name: string }>
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntities)
