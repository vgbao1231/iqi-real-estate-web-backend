import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContactModule } from './modules/contact/contact.module';
import { EnumModule } from './modules/enum/enum.module';
import { PartnerModule } from './modules/partner/partner.module';
import { PrismaModule } from './modules/prisma/prisma.module';
// import { ProjectsModule } from './modules/project/project.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MerchandiseModule } from './modules/merchandise/merchandise.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    // ProjectsModule,
    AuthModule,
    UploadModule,
    EnumModule,
    PartnerModule,
    ArticleModule,
    ContactModule,
    MerchandiseModule,

    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // Cấu hình SMTP Transport
        transport: {
          host: configService.get<string>('MAIL_HOST'), // Ví dụ: 'smtp.gmail.com'
          port: configService.get<number>('MAIL_PORT'), // Ví dụ: 587
          secure: configService.get('MAIL_SECURE') === 'true', // Dùng TLS/SSL
          requireTLS: false,
          auth: {
            user: configService.get<string>('MAIL_USER'), // Địa chỉ email gửi
            pass: configService.get<string>('MAIL_PASSWORD'), // Mật khẩu/App Password
          },
        },
        defaults: {
          from: `"IQI Vietnam" <${configService.get('MAIL_USER')}>`, // Email mặc định
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
