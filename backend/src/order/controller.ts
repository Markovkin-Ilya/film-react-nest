import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './service';
import { CreatOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  create(@Body() creatOrderDto: CreatOrderDto) {
    return this.orderService.createOrder(creatOrderDto);
  }
}
