import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductColor } from '../../product-color/entities/product-color.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  imageURL: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => ProductColor, (productColor) => productColor.products)
  @JoinColumn({ name: 'product_color_id' })
  product_color: ProductColor

  @ManyToOne(() => Branch, (branch) => branch.products)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  order_details: OrderDetail[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ default: true })
  is_activated: boolean;
}
