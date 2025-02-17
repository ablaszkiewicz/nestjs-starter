import { Module } from '@nestjs/common';
import { AuthTraditionalModule } from '../traditonal/auth-traditional.module';
import { AuthGuard } from './guards/auth.guard';
import { CustomJwtModule } from '../custom-jwt/custom-jwt.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthTraditionalModule, CustomJwtModule],
  providers: [AuthGuard, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthCoreModule {}
