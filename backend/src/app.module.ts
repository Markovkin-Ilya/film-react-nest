import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { FilmsModule } from './films/module';
import { OrderModule } from './order/module';
import { configProvider } from './app.config.provider';
import { HttpExceptionFilter } from './ErrorFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/afisha'),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider, HttpExceptionFilter],
})
export class AppModule {}
