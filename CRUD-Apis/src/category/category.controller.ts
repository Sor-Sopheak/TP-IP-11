import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post('/add')
    async createCategory(@Body() Category: CreateCategoryDto) {
        return await this.categoryService.create(Category);
    }

    @Get('/all')
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // Get by ID
    @Get('/id')
    async getCategory(@Body('id') id: string): Promise<Category> {
        return this.categoryService.findById(id);
    }

    // Update by ID
    @Put('/update')
    async updateCategpry(
        @Body() category: UpdateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.updateById(category);
    }

    // Delete by ID
    @Delete('/delete')
    async deleteCategory(@Body('id') id: string): Promise<{status?: boolean; message?: string }> {
        return this.categoryService.deleteById(id);
    }
}
