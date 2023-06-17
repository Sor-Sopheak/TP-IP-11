import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor( 
        @InjectModel(Category.name)
        private categoryModel: Model<Category>,
        ) {}
        
        async create( category: CreateCategoryDto ): Promise<{ category?: Category; status?: boolean; message?: string, error?: any }> {
            try {
                const newCategory = await this.categoryModel.create(category);
                
                return {
                    status: true,
                    category: newCategory
                };
            } catch (error) {
                return {
                    status: false,
                    error: error
                }
            } 
        }
        
        async findAll(): Promise<Category[]> {
            return this.categoryModel.aggregate([
                {
                    $lookup: {
                        from: 'item',
                        localField: '_id',
                        foreignField: 'categoryId',
                        as: 'subcategory',
                    },
                },
            ])
        }
        
        async findById(id: string): Promise<Category> {
            const category = await this.categoryModel.findById(id).exec();
            if (!category) {
                throw new NotFoundException(`Category with this ID (${id}) not found.`);
            }
            return category;
        }
        
        async updateById(category: UpdateCategoryDto): Promise<Category> {
            const {id, name, description } = category;
            const updateCategory =  await this.categoryModel.findByIdAndUpdate(id, { name, description }, {
                new: true
            });
            return updateCategory;
        }
        
        async deleteById(id: string): Promise<{ status?: boolean; message?: string }> {
            await this.categoryModel.findByIdAndDelete(id);
            return {
                status: true,
                message: "Category deleted successfully."
            }
        }
    }
    