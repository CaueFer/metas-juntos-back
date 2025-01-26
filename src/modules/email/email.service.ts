import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {

    // MOCK PARA TESTAR O EMAIL SENDER
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D',
      },
    });
  }

  async sendEmailOtpCode(email: string, otpCode: string) {
    let message = {
      from: 'Sender Name <sender@example.com>', // Sender address
      to: email, // List of receivers
      subject: 'Seu Código OTP', // Subject line
      text: `Olá! Seu código OTP é: ${otpCode}. Ele é válido por 5 minutos.`, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50; text-align: center;">Código de Verificação (OTP)</h2>
          <p style="font-size: 16px; color: #333; text-align: center;">
            Olá, <br>
            Aqui está seu código OTP. Use-o para completar sua verificação.
          </p>
          <div style="margin: 20px auto; text-align: center; background-color: #4CAF50; color: #fff; font-size: 24px; font-weight: bold; padding: 15px; border-radius: 8px; width: fit-content;">
            ${otpCode}
          </div>
          <p style="font-size: 14px; color: #555; text-align: center;">
            Este código é válido por <strong>5 minutos</strong>. <br>
            Caso você não tenha solicitado este código, ignore este email.
          </p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #777; text-align: center;">
            © 2025 Sua Empresa. Todos os direitos reservados.
          </p>
        </div>
      `,
    };

    const info = await this.transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
