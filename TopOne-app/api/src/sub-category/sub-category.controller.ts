import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategory } from './schemas/sub-category.schema';
import { CreateSubcategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('item')
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService) {}

    @Post('/add')
    async createSubCategory(@Body() SubCategory: CreateSubcategoryDto) {
        return await this.subCategoryService.create(SubCategory);
    }

    @Get('/all')
    async getAllSubCategory(): Promise<SubCategory[]> {
        return this.subCategoryService.findAll();
    }

    @Get('/id')
    async getSubCategory(@Body('id') id: string): Promise<SubCategory> {
        return this.subCategoryService.findById(id);
    }

    @Get('/update')
    async updateSubCategory(
        @Body() subCategory: UpdateSubcategoryDto
    ): Promise<SubCategory> {
        return this.subCategoryService.updateById(subCategory);
    }

    @Delete('/delete')
    async deleteSubCategory(@Body('id') id: string): Promise<{ status?: boolean; message?: string }> {
        return this.subCategoryService.deleteById(id);
    }
}
