import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return await this.orderDetailsService.create(createOrderDetailDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async findAll() {
    return await this.orderDetailsService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('by-user')
  async findByUser(@Req() request: RequestWithUser) {
    return await this.orderDetailsService.findByUser(request);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderDetailsService.findOne(+id);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Post('update-status')
  update(@Req() request: RequestWithUser) {
    return this.orderDetailsService.update(request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
