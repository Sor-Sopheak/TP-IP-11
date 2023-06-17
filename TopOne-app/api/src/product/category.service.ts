import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private prducts = [];

    create(data: any) {
        this.prducts.push(data);
        return data;
    }

    findAll() {
        return this.prducts;
    }
}

