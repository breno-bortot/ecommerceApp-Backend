import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNotEmptyObject } from 'class-validator';
import { Model } from 'mongoose';
import { UserInterface } from 'src/user/interface/user.interface';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dtos';
import { ProductParams } from './dto/product.params';
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

    async findAll(query): Promise<ProductInterface[]> {
        try {
            if (isNotEmptyObject(query)) {
                let list = await this.productModel.find({
                    $or: [
                        { 
                            referenceCode: query.referenceCode? {
                                $regex: query.referenceCode,
                                $options: 'ig'
                            } : ''
                        },
                        { 
                            name: query.name? {
                                $regex: query.name,
                                $options: 'ig'
                            } : ''
                        }
                    ]
                })

                return list;
            }
            
            let list = await this.productModel.find();
            
            return list;

        } catch (error) {
            
            return error.message;

        }
    }

    async findBySeller(sellerId: string): Promise<ProductInterface[]> {
        try {
            const list = await this.productModel.find({ seller_id: sellerId });

            return list;
            
        } catch (error) {
            
            return error.message;

        }
    }

    async findOneById(params: ProductParams): Promise<ProductInterface> {
        try {
            const productDetails = await this.productModel.findById(params.productId);
            await productDetails.populate('seller_id');

            return productDetails;
            
        } catch (error) {
            
            return error.message;

        }
    }

    async updateProduct(updateProductDto: UpdateProductDto, params: ProductParams) {
        try {
            const updatedAt = Date.now();
            const updateProductBody = { ...updateProductDto, updated_at: updatedAt };
            const updatedProduct = await this.productModel.findByIdAndUpdate(params.productId, updateProductBody, { new: true });

            return updatedProduct;

        } catch (error) {

            return error.message; 

        }
    }

    async deleteProduct(params: ProductParams) {
        try {
            const productDeleted = await this.productModel.findByIdAndDelete(params.productId);

            return productDeleted;

        } catch (error) {

            return error.message;

        }
    }


}
