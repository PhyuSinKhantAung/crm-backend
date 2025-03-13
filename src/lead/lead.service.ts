import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { UpdateLeadDto } from './dtos/update-lead.dto';
import { Lead, leadStatus } from './types';
import { calculateForecastedRevenue } from 'src/utils/calculate-forecasted-revenue.util';
import { GetLeadsDto } from './dtos/get-leads.dto';
import { Prisma } from '@prisma/client';
import checkSelfPermission from 'src/utils/check-self-permission.util';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async createLead(dto: CreateLeadDto, salePersonUserId: string) {
    await this.prisma.lead.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        estimatedRevenue: dto?.estimatedRevenue || null,
        forecastedRevenue: dto?.estimatedRevenue || null,
        actualRevenue: 0,
        userId: salePersonUserId,
      },
    });
  }

  async getLeadById(id: string): Promise<Lead | null> {
    const lead = await this.prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return lead;
  }

  async updateLeadById(id: string, dto: UpdateLeadDto, userId: string) {
    let forecastedRevenue = 0;
    let actualRevenue = 0;

    const existingLead = await this.prisma.lead.findUnique({
      where: {
        id,
      },
    });

    if (!existingLead) throw new BadRequestException('Lead not found!');

    checkSelfPermission(userId, existingLead.userId);

    if (dto.status && existingLead.status !== dto.status) {
      forecastedRevenue = calculateForecastedRevenue(
        dto.estimatedRevenue,
        dto.status,
      );

      if (dto.status === leadStatus.LOST) {
        actualRevenue = 0;
      } else {
        actualRevenue = forecastedRevenue;
      }
    }

    await this.prisma.lead.update({
      where: {
        id,
      },
      data: {
        ...dto,
        forecastedRevenue,
        actualRevenue,
      },
    });
  }

  async getLeads(dto: GetLeadsDto): Promise<{ data: Lead[]; count: number }> {
    const where: Prisma.LeadWhereInput = {};

    if (dto.search) {
      where.name = {
        contains: dto.search,
      };
    }

    if (dto.userId) {
      where.userId = dto.userId;
    }

    const leadsPromise = this.prisma.lead.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    const leadsCountPromise = this.prisma.lead.count({
      where,
    });

    const [leads, count] = await Promise.all([leadsPromise, leadsCountPromise]);

    return { data: leads, count };
  }
}
