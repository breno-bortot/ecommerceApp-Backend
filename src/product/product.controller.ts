import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dtos';
import { ProductParams } from './dto/product.params';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    createAction(@Body() createProductDto: CreateProductDto){
        return createProductDto;
    }
    
    @Get('list')
    findAllAction(){
        return 'list action';
    }
    
    @Get('details/:productId')
    findOneAction(@Param() params: ProductParams){
        return params;
    }
    
    @Put(':productId')
    updateAction(@Body() updateProductDto: UpdateProductDto, @Param() params: ProductParams){
        return { updateProductDto, params };
    }
    
    @Delete(':productId')
    deleteAction(@Param() params: ProductParams){
        return params;
    }
}
