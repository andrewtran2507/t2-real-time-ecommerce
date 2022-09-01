import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
export class CreateOrderDetailDto {
  @IsString()
  @IsNotEmpty()
  public order_id: string;

  @IsString()
  @IsNotEmpty()
  public product_id: string;

  @IsNumber()
  @IsNotEmpty()
  public quantity: number;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsNotEmpty()
  @IsBoolean()
  public is_completed: boolean;
}
