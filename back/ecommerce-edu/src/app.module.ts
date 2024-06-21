import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
