import { User } from 'src/user/types';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: LeadStatus;
  forecastedRevenue: number | null;
  estimatedRevenue: number | null;
  actualRevenue: number | null;
  userId: string;
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export const leadStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  IN_NEGOTIATION: 'IN_NEGOTIATION',
  WON: 'WON',
  LOST: 'LOST',
};

export type LeadStatus = (typeof leadStatus)[keyof typeof leadStatus];
