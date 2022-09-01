import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from './entities/product-color.entity';
import { ProductColorService } from './product-color.service';
import { ProductColorController } from './product-color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColor])],
  controllers: [ProductColorController],
  providers: [ProductColorService]
})
export class ProductColorModule {}
