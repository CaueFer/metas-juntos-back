import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { generateOtpCode } from 'src/common/utils/otp-generator.util';
import { EmailService } from '../email/email.service';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private _emailService: EmailService) {}

  async generateOtp(email: string, res: Response): Promise<Response> {
    try {
      const otpCode = generateOtpCode();

      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 5);

      await prisma.otp.upsert({
        where: { email },
        update: {
          code: otpCode,
          expiresAt: expiresAt,
        },
        create: {
          email,
          code: otpCode,
          expiresAt,
        },
      });

      await this._emailService.sendEmailOtpCode(email, otpCode);

      return res.status(200).json({
        message: 'OTP Code Sent',
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: 'Error on OTP Code Generated',
        error: error,
      });
    }
  }

  async verifyOtp(
    email: string,
    receivedOtp: string,
    res: Response,
  ): Promise<Response> {
    if (!email || !receivedOtp) {
      return res.status(400).json({
        message: 'Email & OtpCode is Required',
      });
    }

    try {
      const otp = await prisma.otp.findFirst({
        where: {
          email,
        },
      });

      if (!otp) {
        return res.status(404).json({
          message: 'Email Not Found',
        });
      }

      if (otp.expiresAt < new Date()) {
        return res.status(401).json({
          message: 'Otp Code Expired',
        });
      }

      if (receivedOtp !== otp.code) {
        return res.status(401).json({
          message: 'Incorrect Otp Code',
        });
      }

      // APOS CONFIRMAR DELETA O OTP
      await prisma.otp.delete({ where: { email } });
      return res.status(200).json({
        message: 'Otp Code Verifyed',
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: 'Error on Verify Otp',
        error: error,
      });
    }
  }
}
