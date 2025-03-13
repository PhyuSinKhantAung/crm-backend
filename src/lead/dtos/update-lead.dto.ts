import { LeadStatus, LeadType } from '@prisma/client';
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

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsOptional()
  zip: string;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  estimatedRevenue: number;

  @IsEnum(LeadType)
  @IsString()
  @IsNotEmpty()
  leadType: LeadType;

  @IsEnum(LeadStatus)
  @IsString()
  @IsNotEmpty()
  status: LeadStatus;
}
