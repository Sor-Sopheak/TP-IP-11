export class UpdateProductDto {
    readonly name: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly subCategoryId: string;
    readonly id: string;
    readonly categoryId: string;
    readonly price: Record<string, string>;
}