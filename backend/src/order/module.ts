import { Module } from '@nestjs/common';
import { OrderService } from './service';
import { OrderRepository } from './repository';
import { OrderController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entity/film';
import { Schedule } from '../films/entity/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    TypeOrmModule.forFeature([Schedule]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
