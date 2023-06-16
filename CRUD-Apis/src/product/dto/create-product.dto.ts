import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    readonly imageUrl: string;

    @IsString()
    @IsNotEmpty()
    readonly subCategoryId: string;

    @IsString()
    @IsNotEmpty()
    readonly categoryId: string;

    readonly shop: Record<string, string>;
}
