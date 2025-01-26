import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

import crypto from 'node:crypto';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  async generateOtp(email: string, res: Response): Promise<Response> {
    try {
      const otpCode = crypto.randomInt(1000, 9999).toString();

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

      await this.sendOtpEmail(email, otpCode);

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

  private async sendOtpEmail(email: string, otpCode: string) {
    console.log(`Enviando OTP para ${email}: ${otpCode}`);
  }

  async verifyOtp(
    email: string,
    receivedOtp: string,
    res: Response,
  ): Promise<Response> {
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
