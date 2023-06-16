import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubcategoryDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly categoryId: string;
}