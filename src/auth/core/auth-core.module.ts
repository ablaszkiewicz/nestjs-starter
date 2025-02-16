import { Module } from '@nestjs/common';
import { AuthTraditionalModule } from '../traditonal/auth-traditional.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthTraditionalModule],
  providers: [],
})
export class AuthCoreModule {}
