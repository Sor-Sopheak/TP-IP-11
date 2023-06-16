import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './category.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post()
    create(@Body() data: any) {
        return this.productService.create(data);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }
}
