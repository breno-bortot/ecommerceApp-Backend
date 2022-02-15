import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'src/user/interface/user.interface';
import { CreateProductDto } from './dto/product.dtos';
import { ProductInterface } from './interface/product.interface';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductInterface>) {}

    async createProduct(createProductDto: CreateProductDto, sellerId: string) {
        try {
            const { referenceCode } = createProductDto;
            const product = await this.productModel.findOne({ referenceCode });

            if (product) {
                throw { message: `ReferenceCode ${referenceCode} is already in use`};
            }

            const newProduct = await new this.productModel({
                seller_id: sellerId,
                ...createProductDto
            })
            
            await newProduct.save();
            await newProduct.populate('seller_id');

            return newProduct;

        } catch (error) {

            return error.message;

        }
    }


}
