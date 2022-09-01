import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetailsService } from '../order-details/order-details.service';
import { ProductService } from '../product/product.service';
import { AlertGateway } from '../alter/alert.gateway'
// import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderDetailsService: OrderDetailsService,
    private productService: ProductService,
    private alertGateway: AlertGateway,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const product_id = createOrderDto.product_id;
    const productItem = await this.productService.findOne(product_id);

    if (!productItem) {
      throw new HttpException(`Your Product is not existed`, HttpStatus.NOT_FOUND);
    }

    delete createOrderDto.product_id;
    const data = this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(data);
    console.log(data)

    const createOrderDetailDto: CreateOrderDetailDto = {
      order_id: data.id,
      product_id: productItem.id,
      quantity: 1,
      price: productItem.price,
      is_completed: false
    };
    const dataDetail = await this.orderDetailsService.create(createOrderDetailDto);

    const order_details = [...(data.order_details || []), dataDetail];
    data.user_id = createOrderDto.user_id;
    data.order_details = order_details;

    /// await this.productService.update(data.id, {...productItem, order_details});
    const orderdetailItem = await this.orderDetailsService.findOne(dataDetail.id);
    this.alertGateway.sendAddAnOrder(orderdetailItem);

    return data;
  }

  async findAll() {
    const [items, count] = await this.orderRepository.findAndCount({
      relations: { user_id: true, order_details: true }
    });
    return {
      items, count
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
