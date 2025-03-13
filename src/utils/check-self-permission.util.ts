import { UnauthorizedException } from '@nestjs/common';

export default (userId: string, dedicatedUserId: string) => {
  if (userId !== dedicatedUserId)
    throw new UnauthorizedException('You are not authorized');
};
