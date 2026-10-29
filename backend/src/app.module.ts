import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { FilmsModule } from './films/module';
import { OrderModule } from './order/module';
import { configProvider } from './app.config.provider';
import { HttpExceptionFilter } from './ErrorFilter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/entity/film';
import { Schedule } from './films/entity/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Film, Schedule],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../public'),
    }),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider, HttpExceptionFilter],
})
export class AppModule {}
