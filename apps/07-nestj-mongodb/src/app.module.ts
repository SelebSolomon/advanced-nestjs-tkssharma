import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { DomainModule } from './app/domain/domain.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import CategoriesModule from './categories/categories.module';
import PostsModule from './posts/post.module';
import SeriesModule from './series/series.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
        connectionFactory: (connection: unknown) => {
          console.log('Database connected successfully');
          return connection;
        },
      }),
    }),
    CategoriesModule,
    PostsModule,
    SeriesModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
