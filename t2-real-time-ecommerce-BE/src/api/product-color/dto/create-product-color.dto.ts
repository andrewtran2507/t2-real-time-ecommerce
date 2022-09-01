import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductColorDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public code: string;
}
