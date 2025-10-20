import { Controller, Get } from '@nestjs/common';
import {
  ArticleCategory,
  ArticleType,
  PartnerCategory,
  UserRole,
} from '@prisma/client';
import {
  ARTICLE_CATEGORY_LABELS,
  ARTICLE_TYPE_LABELS,
  mapEnumToItems,
  PARTNER_CATEGORY_LABELS,
  USER_ROLE_LABELS,
} from 'src/common/enums/enum-helper';

@Controller('enums')
export class EnumController {
  @Get()
  getAllEnums() {
    return {
      partnerCategory: mapEnumToItems(PartnerCategory, PARTNER_CATEGORY_LABELS),
      userRoles: mapEnumToItems(UserRole, USER_ROLE_LABELS),
      articleCategories: mapEnumToItems(
        ArticleCategory,
        ARTICLE_CATEGORY_LABELS,
      ),
      articleTypes: mapEnumToItems(ArticleType, ARTICLE_TYPE_LABELS),
    };
  }
}
