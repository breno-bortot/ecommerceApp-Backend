import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor  } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiConsumes, ApiCookieAuth, ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { SellerGuard } from 'src/user/guards/seller.guard';
import { User } from 'src/user/utilities/user.decorator';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dtos';
import { ProductParams } from './dto/product.params';
import { ProductInterface } from './interface/product.interface';
import { ProductService } from './product.service';
import { ProductSwagger } from './swagger/product.swagger';

const maxSize = 5
 * 1024 * 1024;
export const storage = {
    fileFilter: (req, file, callback) => {
        if ( file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
            callback(null, true);
        } else {
             callback(new HttpException('Only .png, .jpg and .jpeg format allowed.', HttpStatus.BAD_REQUEST), false);
        }
    },
    limits: { fileSize: maxSize },
    storage: diskStorage({
        destination: './uploads/product_images',
        filename: (req, file, callback) => {
            const filename: string = parse(file.originalname).name.replace(/\s/g, '') + '-' + Date.now();
            const extension: string = parse(file.originalname).ext;
          
            callback(null, `${filename}${extension}`);
        }
    })
}

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
   
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @ApiCookieAuth()
    @Post()
    @ApiOperation({ summary: 'Product Registration'})
    @ApiCreatedResponse({ 
        description: 'Product created',
        type: ProductSwagger 
    })
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @UseInterceptors(FileInterceptor('image', storage ))
    @ApiConsumes('multipart/form-data')
    createAction(@UploadedFile() file: Express.Multer.File, @Body() createProductDto: CreateProductDto, @User() user): Promise<ProductInterface>{
        if (file) {
            createProductDto.imagePath = file.path;
        }

        return this.productService.createProduct(createProductDto, user.sub);
    }
    

    @Get('list')
    @ApiOperation({ summary: 'List/Search Products'})
    @ApiOkResponse({ 
        description: 'Products list',
        type: [ProductSwagger]
    })
    listAllAction(@Query() query: ProductQueryDto): Promise<ProductInterface[]>{
        return this.productService.findAll(query);
    }
    

    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @ApiCookieAuth()
    @Get('seller/list')
    @ApiOperation({ summary: `List of Seller's products` })
    @ApiOkResponse({ 
        description: `Seller's products list`,
        type: [ProductSwagger]
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    listBySellerAction(@User() user): Promise<ProductInterface[]>{
        return this.productService.findBySeller(user.sub);
    }
    

    @Get('details/:product_id')
    @ApiOperation({ summary: 'Product details'})
    @ApiFoundResponse({ 
        description: 'Product found',
        type: ProductSwagger
    })
    @ApiBadRequestResponse({ description: 'Invalid product-id'})
    findOneAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.findOneById(params);
    }
   

    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @ApiCookieAuth()
    @Put(':product_id')
    @ApiOperation({ summary: 'Update product'})
    @ApiCreatedResponse({ 
        description: 'Product updated',
        type: ProductSwagger 
    })
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBadRequestResponse({ description: 'Invalid product-id'})
    @UseInterceptors(FileInterceptor('image', storage ))
    @ApiConsumes('multipart/form-data')
    updateAction(@Body() updateProductDto: UpdateProductDto, @Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.updateProduct(updateProductDto, params);
    }
    

    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @ApiCookieAuth()
    @Delete(':product_id')
    @ApiOperation({ summary: 'Delete product'})
    @ApiOkResponse({ description: 'Product deleted successfully' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBadRequestResponse({ description: 'Invalid product-id'})
    deleteAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.deleteProduct(params);
    }
}
