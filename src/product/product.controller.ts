import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dtos';
import { ProductParams } from './dto/product.params';
import { ProductInterface } from './interface/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    //User authentication/ Seller authorization
    @Post('create/:seller_id')
    createAction(@Body() createProductDto: CreateProductDto, @Param('seller_id') seller_id: string): Promise<ProductInterface>{
        return this.productService.createProduct(createProductDto, seller_id);
    }
    
    @Get('list')
    listAllAction(@Query() query: ProductQueryDto): Promise<ProductInterface[]>{
        return this.productService.findAll(query);
    }
    //User authentication/ Seller authorization
    @Get('seller/list/:seller_id')
    listBySellerAction(@Param('seller_id') seller_id: string): Promise<ProductInterface[]>{
        return this.productService.findBySeller(seller_id);
    }
    
    @Get('details/:productId')
    findOneAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.findOneById(params);
    }
    //User authentication/ Seller authorization
    @Put(':productId')
    updateAction(@Body() updateProductDto: UpdateProductDto, @Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.updateProduct(updateProductDto, params);
    }
    //User authentication/ Seller authorization
    @Delete(':productId')
    deleteAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.deleteProduct(params);
    }
}
