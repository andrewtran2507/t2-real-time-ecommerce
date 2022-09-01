import { IsString } from 'class-validator';
import { PaginationParams } from '../../../utils/types/paginationParams';

export class FilterProductDto extends PaginationParams {
  @IsString()
  public name: string;

  @IsString()
  public categoryId: string;

  @IsString()
  public branchId: string;

  @IsString()
  public productColorId: string;
}
