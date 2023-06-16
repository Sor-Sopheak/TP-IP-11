import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop()
  name: string;
  
  // @Prop({ type: [{ type: Types.ObjectId, ref: 'SubCategory' }] })
  // subCategories: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);