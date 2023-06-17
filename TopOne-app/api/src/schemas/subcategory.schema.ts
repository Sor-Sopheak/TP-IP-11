import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema()
export class SubCategory extends Document {
    @Prop()
    name: string;

    // @Prop({ type: [{ type: Types.ObjectId, ref: 'SubCategory' }] })
    // subCategories: SubCategory[];
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
