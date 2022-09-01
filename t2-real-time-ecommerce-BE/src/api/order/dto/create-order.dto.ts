import { IsNotEmpty, IsString } from 'class-validator';
export class CreateOrderDto {
  @IsString()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public user_id: string;

  @IsString()
  @IsNotEmpty()
  public product_id: string;
}
