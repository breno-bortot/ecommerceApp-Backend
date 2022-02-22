import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNotEmptyObject } from 'class-validator';
import { Model } from 'mongoose';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dtos';
import { ProductParams } from './dto/product.params';
import { ProductInterface } from './interface/product.interface';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductInterface>) {}

    async createProduct(createProductDto: CreateProductDto, seller_id: string): Promise<ProductInterface> {
            const { reference_code } = createProductDto;
            const product = await this.productModel.findOne({ reference_code });

            if (product) {
                throw new HttpException(`reference_code ${reference_code} is already in use`, HttpStatus.BAD_REQUEST)
            }

            const newProduct = await new this.productModel({
                seller_id,
                ...createProductDto
            })
            
            await newProduct.save();
            await newProduct.populate('seller_id');

            if (!newProduct) {
                throw new HttpException(`Product was not saved in DB`, HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return newProduct;
    }

    async findAll(query: ProductQueryDto): Promise<ProductInterface[]> {
        try {
            if (isNotEmptyObject(query)) {
                let list = await this.productModel.find({
                    $or: [
                        { 
                            reference_code: query.reference_code? {
                                $regex: query.reference_code,
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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findBySeller(seller_id: string): Promise<ProductInterface[]> {
        try {
            const list = await this.productModel.find({ seller_id });

            return list;
            
        } catch (error) {
            throw new HttpException(`Invalid Seller`, HttpStatus.BAD_REQUEST)
        }
    }

    async findOneById(params: ProductParams): Promise<ProductInterface> {
        try {
            const productDetails = await this.productModel.findById(params.productId);
            await productDetails.populate('seller_id');

            if (!productDetails) {
                throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND)
            }

            return productDetails;
            
        } catch (error) {
            throw new HttpException(`Invalid product-id`, HttpStatus.BAD_REQUEST)
        }
    }

    async updateProduct(updateProductDto: UpdateProductDto, params: ProductParams): Promise<ProductInterface> {
        try {
            const updatedAt = Date.now();
            const updateProductBody = { ...updateProductDto, updated_at: updatedAt };
            const updatedProduct = await this.productModel.findByIdAndUpdate(params.productId, updateProductBody, { new: true });

            if (!updatedProduct) {
                throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND)
            }

            return updatedProduct;

        } catch (error) { 
            throw new HttpException(`Invalid product-id`, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteProduct(params: ProductParams): Promise<ProductInterface> {
        try {
            const deletedProduct = await this.productModel.findByIdAndDelete(params.productId);

            if (!deletedProduct) {
                throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND)
            }

            return deletedProduct;

        } catch (error) {
            throw new HttpException(`Invalid product-id`, HttpStatus.BAD_REQUEST)
        }
    }
}
