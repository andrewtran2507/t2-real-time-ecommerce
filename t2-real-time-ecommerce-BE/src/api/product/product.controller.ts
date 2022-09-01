import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, CacheKey, CacheTTL, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { PaginationParams } from '../../utils/types/paginationParams';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async findAll(
    @Query() { offset, limit, startId }: PaginationParams,
  ) {
    if (offset && limit) {
      return await this.productService.getProducts(
        offset, limit, startId
      );
    }
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('filter-data')
  async filter(@Body() body: FilterProductDto) {
    return await this.productService.filter(body);
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(id);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

