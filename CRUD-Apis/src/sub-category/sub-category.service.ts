import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory } from './schemas/sub-category.schema';
import { Model } from 'mongoose';
import { CreateSubcategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectModel(SubCategory.name)
        private subCategoryModel: Model<SubCategory>
    ) {}

    async create( subCategory: CreateSubcategoryDto ): Promise<{ subCategory?: SubCategory; status?: boolean; message?: string, error?: any }> {
        try {
            const newSubCategory = await this.subCategoryModel.create(subCategory);

            return {
                status: true,
                subCategory: newSubCategory
            };
        } catch (error){
            return {
                status: false,
                error: error
            }
        }
    }

    async findAll(): Promise<SubCategory[]> {
        return this.subCategoryModel.find().exec();
    }

    async findById(id: string): Promise<SubCategory> {
        const subCategory = await this.subCategoryModel.findById(id).exec();
        if (!subCategory) {
          throw new NotFoundException(`Sub-Category with this ID (${id}) not found.`);
        }
        return subCategory;
    }

    async updateById(subCategory: UpdateSubcategoryDto): Promise<SubCategory> {
        const {id, name, description, categoryId } = subCategory;
        const updateSubcategory =  await this.subCategoryModel.findByIdAndUpdate(id, { name, categoryId, description }, {
          new: true
        });
        return updateSubcategory;
    }

    async deleteById(id: string): Promise<{ status?: boolean; message?: string }> {
        await this.subCategoryModel.findByIdAndDelete(id);
        return {
            status: true,
            message: "Category deleted successfully."
        }
    }
}
