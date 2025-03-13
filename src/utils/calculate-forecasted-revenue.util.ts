import { LeadStatus } from 'src/lead/types';

export function calculateForecastedRevenue(
  estimatedRevenue: number,
  leadStatus: LeadStatus,
): number {
  const probabilityMap: Record<typeof leadStatus, number> = {
    NEW: 0.1, // 10%
    CONTACTED: 0.35, // 35%
    IN_NEGOTIATION: 0.75, // 75%
    WON: 1.0, // 100%
    LOST: 0.0, // 0%
  };

  return estimatedRevenue * probabilityMap[leadStatus];
}
