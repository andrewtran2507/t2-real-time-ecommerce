import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, FindManyOptions, Repository, In, Like, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  index = 'prducts';
  public relationshipData = {
    product_color: true,
    branch: {
      category: true
    },
    order_details: true
  };
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    const [items, count] = await this.productRepository.findAndCount({
      relations: this.relationshipData,
    });
    return {
      items, count
    };
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({
      relations: this.relationshipData,
      where: { id },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }

  async getProducts(
    offset?: number,
    limit?: number,
    startId?: string,
    options?: FindManyOptions<Product>,
  ) {
    if (offset > limit) {
      throw new HttpException(`Please recheck your offset ${offset} and limit ${limit} number`, HttpStatus.NOT_FOUND);
    }

    const where: FindManyOptions<Product>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.productRepository.count();
    }

    const [items, count] = await this.productRepository.findAndCount({
      relations: this.relationshipData,
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      ...options,
    });

    return {
      items,
      count: startId ? separateCount : count,
      offset,
      limit,
      startId,
    };
  }

  async filter(body: FilterProductDto) {
    const {
      name = '',
      categoryId = '',
      branchId = '',
      productColorId = '',
      offset,
      limit,
      startId,
    } = body;
    if (offset > limit) {
      throw new HttpException(`Please recheck your offset ${offset} and limit ${limit} number`, HttpStatus.NOT_FOUND);
    }

    let where: FindManyOptions<Product>['where'] = {};
    if (name) {
      where = {
        ...where,
        name: ILike(`%${name}%`),
      };
    }
    if (categoryId) {
      where = {
        ...where,
        branch: {
          category: {
            id: categoryId
          }
        }
      };
    }
    if (branchId) {
      where = {
        ...where,
        branch: {
          id: branchId
        }
      };
    }
    if (categoryId && branchId) {
      delete where.branch;
      where = {
        ...where,
        branch: {
          id: branchId,
          category: {
            id: categoryId
          }
        }
      };
    }
    if (productColorId) {
      where = {
        ...where,
        product_color: {
          id: productColorId
        }
      };
    }
    const [items, count] = await this.productRepository.findAndCount({
      relations: this.relationshipData,
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return {
      items,
      count,
      offset,
      limit,
      startId,
    };
  }
}
