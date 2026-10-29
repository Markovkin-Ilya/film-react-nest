import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './controller';
import { OrderService } from './service';
import { orderFixtures } from './fixtures';

describe('FilmsController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue(orderFixtures.order),
      })
      .compile();
    controller = module.get<OrderController>(OrderController);
  });

  it('should order', async () => {
    expect(controller).toBeDefined();
    const result = await controller.create(orderFixtures.requestForOrder);
    expect(result).toEqual(orderFixtures.order);
  });
});
