import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useFactory: (): AppConfig => ({
    database: {
      driver: process.env.DATABASE_DRIVER || 'postgres',
      url: process.env.DATABASE_URL || 'postgres://localhost:5432/films',
    },
  }),
  inject: [],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
