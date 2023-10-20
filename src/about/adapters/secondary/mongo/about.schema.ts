import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema()
export class AboutEntities {
    @Prop({ required: true })
    title: string;

    @Prop([{ 
        _id: false,
        id: { type: String, required: true },
        name: { type: String, required: true },
        icon: { type: String, required: true }
    }])
    technologies: Array<{ id: string, name: string, icon: string }>;
}

export const AboutSchema = SchemaFactory.createForClass(AboutEntities);
