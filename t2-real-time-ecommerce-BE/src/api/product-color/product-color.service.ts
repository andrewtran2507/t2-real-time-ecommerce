import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductColor } from './entities/product-color.entity';
import { CreateProductColorDto } from './dto/create-product-color.dto';
import { UpdateProductColorDto } from './dto/update-product-color.dto';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>,
  ) {}

  async findAll() {
    const [items, count] = await this.productColorRepository.findAndCount();
    return {
      items, count
    };
  }

  async findOne(id: string) {
    const item = await this.productColorRepository.findOneBy({ id });
    if (item) {
      return item;
    }
    throw new HttpException('Product Color with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async create(createProductColorDto: CreateProductColorDto) {
    const newData = await this.productColorRepository.create(createProductColorDto);
    await this.productColorRepository.save(newData);
    return newData;
  }

  async update(id: string, updateProductColorDto: UpdateProductColorDto) {
    await this.productColorRepository.update(id, updateProductColorDto);
    const updateData = await this.productColorRepository.findOneBy({id});
    if (updateData) {
      return updateData
    }
    throw new HttpException('Product Color not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const item = await this.productColorRepository.findOneBy({id});
    if (!item) {
      throw new HttpException('Product Color does not exist', HttpStatus.NOT_FOUND);
    }
    item.is_activated = false;
    delete item.id;
    const update = await this.productColorRepository.update(id, { ...item });
    if (!update.affected) {
      throw new HttpException('Product Color not found', HttpStatus.NOT_FOUND);
    }
    return { ...item, id };
  }
}
