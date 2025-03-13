import { LeadStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? Number(value) : value), {
    toClassOnly: true,
  }) // Transform string to number
  estimatedRevenue: number;

  @IsEnum(LeadStatus)
  @IsString()
  @IsNotEmpty()
  status: LeadStatus;
}
