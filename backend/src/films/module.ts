import { Module } from '@nestjs/common';
import { FilmsService } from './service';
import { FilmsRepository } from './repository';
import { FilmsController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entity/film';
import { Schedule } from './entity/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    TypeOrmModule.forFeature([Schedule]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
