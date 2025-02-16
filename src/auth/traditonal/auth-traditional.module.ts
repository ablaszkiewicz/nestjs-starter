import { Module } from '@nestjs/common';
import { AuthTraditionalService } from './auth-traditional.service';
import { UserWriteModule } from '../../user/write/user-write.module';
import { AuthTraditionalController } from './auth-traditional.controller';

@Module({
  imports: [UserWriteModule],
  controllers: [AuthTraditionalController],
  providers: [AuthTraditionalService],
})
export class AuthTraditionalModule {}
