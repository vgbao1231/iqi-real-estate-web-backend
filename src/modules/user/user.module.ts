import { Module } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService],
})
export class UsersModule {}
