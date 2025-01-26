import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [UserModule, AuthModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
