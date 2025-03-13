import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { GetUser, Roles } from 'src/auth/decorators';
import { userRole } from 'src/user/types';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { GetLeadsDto } from './dtos/get-leads.dto';
import { UpdateLeadDto } from './dtos/update-lead.dto';

@Controller('leads')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(userRole.ADMIN, userRole.SUPER_ADMIN)
  @Get('/')
  async getLeads(@Query() dto: GetLeadsDto) {
    return await this.leadService.getLeads(dto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(userRole.SALE_PERSON)
  @Post('/create')
  async createUser(@Body() dto: CreateLeadDto, @GetUser('id') id: string) {
    await this.leadService.createLead(dto, id);

    return {
      status: 200,
      message: 'Lead Added successfully!',
    };
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(userRole.SALE_PERSON)
  @Get('/:id')
  async getLeadById(@Param('id') id: string) {
    return await this.leadService.getLeadById(id);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(userRole.SALE_PERSON)
  @Put('/:id')
  async updateLeadById(
    @Param('id') id: string,
    @Body() dto: UpdateLeadDto,
    @GetUser('id') userId: string,
  ) {
    await this.leadService.updateLeadById(id, dto, userId);

    return {
      status: 200,
      message: 'Lead Updated successfully!',
    };
  }

  // @UseGuards(JwtGuard, RoleGuard)
  // @Roles(userRole.ADMIN, userRole.SUPER_ADMIN)
  // @Get('/forecast-revenue-report')
  // async getTotalForecastRevenueReport() {
  //   return await this.leadService.getTotalForecastRevenueReport();
  // }

  // @UseGuards(JwtGuard, RoleGuard)
  // @Roles(userRole.ADMIN, userRole.SUPER_ADMIN)
  // @Get('/:id/forecast-revenue-report')
  // async getLeadForecastRevenueReportById(@Param('id') id: string) {
  //   return await this.leadService.getLeadForecastRevenueReportById(id);
  // }
}
