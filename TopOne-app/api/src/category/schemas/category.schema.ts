import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Category {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop()
    description: string;
}


export const CategorySchema = SchemaFactory.createForClass(Category);