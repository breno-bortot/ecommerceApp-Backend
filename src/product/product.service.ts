import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dtos';
import { ProductInterface } from './interface/product.interface';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductInterface>) {}

    async createProduct(createProductDto: CreateProductDto): Promise<ProductInterface> {
        try {
            

        } catch (error) {
            return error.message;
        }
        
        return 
    }


}
