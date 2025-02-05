import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

// DTO para paginação de informações no banco de dados (limit e offset)

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  //@Max()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  //@Max()
  @Type(() => Number)
  offset: number;
}
