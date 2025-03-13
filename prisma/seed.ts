import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { userRole } from 'src/user/types';

const prisma = new PrismaClient();

export async function seedDatabase() {
  try {
    const hashedPassword = await argon.hash('123456');

    const superAdminCount = await prisma.user.count({
      where: { role: userRole.SUPER_ADMIN },
    });

    if (superAdminCount === 0) {
      console.log('Creating superadmin user...');

      await prisma.user.create({
        data: {
          email: 'superadmin@gmail.com',
          password: hashedPassword,
          name: 'Super Admin',
          role: userRole.SUPER_ADMIN,
        },
      });

      console.log('SuperAdmin user created successfully!');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
