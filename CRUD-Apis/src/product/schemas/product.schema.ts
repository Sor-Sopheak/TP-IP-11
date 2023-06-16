import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "@nestjs/passport";
import { SchemaTypes, Types } from "mongoose";
import { Category } from "src/category/schemas/category.schema";
import { SubCategory } from "src/sub-category/schemas/sub-category.schema";

@Schema({
    timestamps: true
})

export class Product {
    @Prop({ required: true})
    name: string;

    @Prop()
    description: string;

    @Prop()
    imageUrl: string;

    @Prop({ type: Object })
    shop: Record<string, string>;

    @Prop({ type: SchemaTypes.ObjectId, ref: Category.name })
    categoryId: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: SubCategory.name })
    subCategoryId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);