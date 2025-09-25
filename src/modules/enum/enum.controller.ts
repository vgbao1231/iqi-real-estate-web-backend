import { Controller, Get } from '@nestjs/common';
import { PartnerCategory, UserRole } from '@prisma/client';

@Controller('enums')
export class EnumController {
  @Get()
  getAllEnums() {
    return {
      partnerCategory: Object.values(PartnerCategory),
      userRole: Object.values(UserRole),
    };
  }
}
