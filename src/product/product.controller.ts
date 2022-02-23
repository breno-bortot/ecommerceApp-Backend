import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor  } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { SellerGuard } from 'src/user/guards/seller.guard';
import { User } from 'src/user/utilities/user.decorator';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dtos';
import { ProductParams } from './dto/product.params';
import { ProductInterface } from './interface/product.interface';
import { ProductService } from './product.service';

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
    @Post('create')
    @UseInterceptors(FileInterceptor('image', storage ))
    createAction(@UploadedFile() file: Express.Multer.File, @Body() createProductDto: CreateProductDto, @User() seller_id: string): Promise<ProductInterface>{
        createProductDto.imagePath = file.path;
      
        return this.productService.createProduct(createProductDto, seller_id);
    }
    
    @Get('list')
    listAllAction(@Query() query: ProductQueryDto): Promise<ProductInterface[]>{
        return this.productService.findAll(query);
    }
    
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @Get('seller/list')
    listBySellerAction(@User() seller_id: string): Promise<ProductInterface[]>{
        return this.productService.findBySeller(seller_id);
    }
    
    @Get('details/:productId')
    findOneAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.findOneById(params);
    }
   
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @Put(':productId')
    updateAction(@Body() updateProductDto: UpdateProductDto, @Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.updateProduct(updateProductDto, params);
    }
    
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @Delete(':productId')
    deleteAction(@Param() params: ProductParams): Promise<ProductInterface>{
        return this.productService.deleteProduct(params);
    }
}
