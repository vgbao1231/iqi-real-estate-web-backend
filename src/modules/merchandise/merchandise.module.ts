// article/article.module.ts

import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MerchandiseController } from './merchandise.controller';
import { MerchandiseService } from './merchandise.service';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [MerchandiseController],
  providers: [MerchandiseService],
})
export class MerchandiseModule {}
