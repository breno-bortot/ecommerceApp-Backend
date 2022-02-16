import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dtos';
import { ProductParams } from './dto/product.params';
import { ProductInterface } from './interface/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create/:sellerId')
    createAction(@Body() createProductDto: CreateProductDto, @Param('sellerId') sellerId: string): Promise<ProductInterface>{
        return this.productService.createProduct(createProductDto, sellerId);
    }
    
    @Get('list')
    listAllAction(@Query() query: ProductQueryDto): Promise<ProductInterface[]>{
        return this.productService.findAll(query);
    }
    
    @Get('seller/list/:sellerId')
    listBySellerAction(@Param('sellerId') sellerId: string): Promise<ProductInterface[]>{
        return this.productService.findBySeller(sellerId);
    }
    
    @Get('details/:productId')
    findOneAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.findOneById(params);
    }
    
    @Put(':productId')
    updateAction(@Body() updateProductDto: UpdateProductDto, @Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.updateProduct(updateProductDto, params);
    }
    
    @Delete(':productId')
    deleteAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.deleteProduct(params);
    }
}
