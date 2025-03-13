export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export const userRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  SALE_PERSON: 'SALE_PERSON',
  MANAGER: 'MANAGER',
} as const;

export type UserRole = (typeof userRole)[keyof typeof userRole];
