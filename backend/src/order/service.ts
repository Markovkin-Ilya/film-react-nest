import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { OrderRepository } from './repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(dto) {
    const tikets = { items: [] };
    dto.tickets.map((ticket) => {
      this.orderRepository.checkSeats(ticket);
      const ticketResult = { ...ticket, id: faker.string.uuid() };
      tikets.items.push(ticketResult);
    });
    const orderResult = { items: [] };
    tikets.items.map((tiket) => {
      this.orderRepository.createOrder(tiket);
      orderResult.items.push(tiket);
    });
    return orderResult;
  }
}
