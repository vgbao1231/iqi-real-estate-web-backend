import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EnumModule } from './modules/enum/enum.module';
import { PartnerModule } from './modules/partner/partner.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProjectsModule } from './modules/project/project.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ProjectsModule,
    AuthModule,
    UploadModule,
    EnumModule,
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
