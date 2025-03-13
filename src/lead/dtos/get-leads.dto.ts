import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetLeadsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  userId?: string;
}
