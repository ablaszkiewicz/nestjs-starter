import { Module } from '@nestjs/common';
import { AuthTraditionalModule } from '../traditonal/auth-traditional.module';

@Module({
  imports: [AuthTraditionalModule],
  providers: [],
})
export class AuthCoreModule {}
