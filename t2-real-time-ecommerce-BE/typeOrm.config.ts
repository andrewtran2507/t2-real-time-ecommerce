import { DataSource, DataSourceOptions } from 'typeorm';
import { configServiceNew } from './src/common/config/config.service';
import { User } from './src/api/user/entities/user.entity';
import { Category } from './src/api/category/entities/category.entity';
import { ProductColor } from './src/api/product-color/entities/product-color.entity';
import { Product } from './src/api/product/entities/product.entity';
import { Branch } from './src/api/branch/entities/branch.entity';
import { OrderDetail } from './src/api/order-details/entities/order-detail.entity';
import { Order } from './src/api/order/entities/order.entity';
import { Role } from './src/api/role/entities/role.entity';

// import PostEntity from './src/api/post/post.entity';

console.log("POSTGRES CONFIG",  {
  type: 'postgres',
  host: configServiceNew.get('POSTGRES_HOST'),
  port: parseInt(configServiceNew.get('POSTGRES_PORT')),
  username: configServiceNew.get('POSTGRES_USER'),
  password: configServiceNew.get('POSTGRES_PASSWORD'),
  database: configServiceNew.get('POSTGRES_DB'),
  logging: 'all',
});
const configDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configServiceNew.get('POSTGRES_HOST'),
  port: parseInt(configServiceNew.get('POSTGRES_PORT')),
  username: configServiceNew.get('POSTGRES_USER'),
  password: configServiceNew.get('POSTGRES_PASSWORD'),
  database: configServiceNew.get('POSTGRES_DB'),
  logging: 'all',
  synchronize: true,
  entities: [
    User,
    Category,
    ProductColor,
    Role,
    Order,
    Branch,
    Product,
    OrderDetail
  ],
  // entities: ['./src/api/**/*.entity{.ts,.js}'],
  // entities: ['./src/**/*.entity{.ts,.js}'],
  // migrations: ['./migrations/**/*{.ts,.js}'],
  // subscribers: ['subscriber/**/*.js']
};

export const dataSource = new DataSource(configDataSourceOptions);
export default configDataSourceOptions;
