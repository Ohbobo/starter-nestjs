import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema()
export class Admin {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);