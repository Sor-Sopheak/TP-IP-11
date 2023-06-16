import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { SubCategory } from 'src/sub-category/schemas/sub-category.schema';
import { Category } from 'src/category/schemas/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,

		@InjectModel(SubCategory.name)
		private subctgModel: Model<SubCategory>,

    @InjectModel(Category.name) 
    private categoryModel: Model<Category>
  ) {}

  async create(product: CreateProductDto): Promise<{
    product?: Product;
    status?: boolean;
    message?: string;
    error?: any;
  }> {
    try {
      const newProduct = await this.productModel.create(product);

      return {
        status: true,
        product: newProduct,
      };
    } catch (error) {
      return {
        status: false,
        error: error,
      };
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Product with this ID (${id}) not found.`);
    }
    return product;
  }

  async updateById(
    product: UpdateProductDto,
  ): Promise<{ Product?: any; status?: any; message?: any }> {
    const { id, name, description, imageUrl, categoryId, subCategoryId, shop } =
      product;
    if (subCategoryId && categoryId) {
			const subctgIds = await this.subctgModel.find({}, '_id').exec();
			for (const scId of subctgIds) {
				if (scId._id.toString() === subCategoryId) {
					const updateProduct = await this.productModel.findByIdAndUpdate(id, {name, description, imageUrl, categoryId, subCategoryId, shop }, {new: true});
					return {
						status: true,
						Product: updateProduct
					};
				}
			}
      return {
				status: false,
				message: 'The subcategory with this ID does not exist.'
			}
    }
    const categoryExists = await this.categoryModel.find({}, '_id').exec();
    if (!categoryExists) {
      return {
        status: false,
        message: 'The category with this ID does not exist.',
      };
    }
    return {
      status: false,
      message: 'The categoryId and subcategoryId cannot be null.',
    };
  }

  async deleteById(
    id: string,
  ): Promise<{ status?: boolean; message?: string }> {
    await this.productModel.findByIdAndDelete(id);
    return {
      status: true,
      message: 'Product deleted successfully.',
    };
  }
}
