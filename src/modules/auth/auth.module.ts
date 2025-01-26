import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from '../email/email.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [EmailModule],
})
export class AuthModule {}
