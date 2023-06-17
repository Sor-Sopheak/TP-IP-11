import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorySchema } from './schemas/sub-category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SubCategory', schema: SubCategorySchema}])],
  providers: [SubCategoryService],
  controllers: [SubCategoryController]
})
export class SubCategoryModule {}
