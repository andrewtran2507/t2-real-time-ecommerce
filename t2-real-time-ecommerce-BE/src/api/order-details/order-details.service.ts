import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderDetailsService {
  public relations = { order: { user: true }, product: {
    product_color: true
  }};
  constructor(
    @InjectRepository(OrderDetail)
    private oderDetailRepository: Repository<OrderDetail>,
    private userService: UserService,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const data = this.oderDetailRepository.create(createOrderDetailDto);
    await this.oderDetailRepository.save(data);
    return data;
  }

  async findAll() {
    const [items, count] = await this.oderDetailRepository.findAndCount({
      relations: this.relations
    });
    return {
      items, count
    };
  }

  async findByUser(request: RequestWithUser) {
    const userItem = await this.userService.findOne(request.user.id);
    if (userItem.role.name !== 'admin') {
      throw new HttpException('User Note Allow For This!', HttpStatus.METHOD_NOT_ALLOWED);
    }
    return this.findAll();
  }

  async findOne(id: string) {
    return await this.oderDetailRepository.findOne({
      where: { id },
      relations: this.relations
    });
  }

  async update(request: RequestWithUser) {
    const userItem = await this.userService.findOne(request?.user?.id);
    if (userItem.role.name !== 'admin') {
      throw new HttpException('User Note Allow For This!', HttpStatus.METHOD_NOT_ALLOWED);
    }

    const orderDetailId = request?.body?.orderDetailId;
    const isCompleted =  request?.body?.isCompleted === 'true';

    console.log(request?.body)

    await this.oderDetailRepository.update(orderDetailId, {is_completed: isCompleted});
    const data = await this.oderDetailRepository.findOne({
      where: { id: orderDetailId,},
      relations: this.relations
    });
    if (data) {
      return data
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
