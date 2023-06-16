import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Category } from "src/category/schemas/category.schema";

@Schema({
    collection: 'item',
    timestamps: true
})

export class SubCategory {
    @Prop({unique: true, required: true})
    name: string;

    @Prop()
    description: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: Category.name, required: true })
    categoryId: Types.ObjectId;

}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);