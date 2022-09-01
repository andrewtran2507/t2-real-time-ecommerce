import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { BranchModule } from './branch/branch.module';
import { ProductColorModule } from './product-color/product-color.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './post/posts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AlertModule } from './alter/alert.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    CategoryModule,
    BranchModule,
    ProductColorModule,
    ProductModule,
    OrderModule,
    OrderDetailsModule,
    RoleModule,
    PostsModule,
    AlertModule
  ],
})
export class ApiModule {}
