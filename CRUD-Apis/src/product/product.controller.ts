import { Body, Controller, Get, Post,Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor( private productService: ProductService ) {

        
    }

    @Post('/add')
        async createProduct(@Body() product:CreateProductDto  ) {
            return await this.productService.create(product);
        }

        @Get('/all')
        async getAllProduct(): Promise<Product[]> {
            return this.productService.findAll();
        }

        @Put('/update')
        async updateProduct(
            @Body() Product: UpdateProductDto
        ) {
            return this.productService.updateById(Product);
        }

        @Delete('/delete')
        async deleteProduct(@Body('id') id: string): Promise<{ status?: boolean; message?: string }> {
            return this.productService.deleteById(id);
        }
}
