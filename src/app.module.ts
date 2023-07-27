import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { Book } from './entity/book.entity';
import { BookType } from './entity/type_book.entity';
import { Publisher } from './entity/publisher.entity';
import { Tag } from './entity/tag.entity';
import { Rate } from './entity/rate.entity';
import { BookTypeModule } from './modules/book_type/book_type.module';
import { PublisherModule } from './modules/publisher/publisher.module';
import { BookModule } from './modules/book/book.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Book, BookType, Publisher, Tag, Rate],
      synchronize: false,
    }),
    BookTypeModule,
    PublisherModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
