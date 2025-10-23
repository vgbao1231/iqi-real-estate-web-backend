import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(
    toEmail: string,
    otpCode: string,
    userName: string,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: toEmail,
        subject: 'Mã Xác Thực OTP - IQI Vietnam',

        // Sử dụng HTML cơ bản cho nội dung email
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <p>Xin chào <strong>${userName}</strong>,</p>
            <p>Đây là mã xác thực OTP của bạn:</p>
            <h2 style="background: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; color: #333; font-size: 24px;">${otpCode}</h2>
            <p>Mã này có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
            <p>Trân trọng,</p>
            <p>Đội ngũ Hỗ trợ</p>
          </div>
        `,
      });
      console.log(`[EmailService] Đã gửi OTP thành công đến: ${toEmail}`);
    } catch (error) {
      console.error('[EmailService] Lỗi khi gửi email OTP:', error);
      throw new InternalServerErrorException(
        'Không thể gửi mã xác thực qua email. Vui lòng kiểm tra lại địa chỉ email hoặc thử lại sau.',
      );
    }
  }
}
