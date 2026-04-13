import { Module } from '@nestjs/common';
import { OrderService } from './service';
import { OrderRepository } from './repository';
import { OrderController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema, Film } from '../films/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
