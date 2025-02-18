import { Module } from '@nestjs/common';
import { UserCoreController } from './user-core.controller';
import { UserReadModule } from '../read/user-read.module';

@Module({
  imports: [UserReadModule],
  providers: [UserCoreController],
  controllers: [UserCoreController],
})
export class UserCoreModule {}
