import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthCoreModule } from './auth/core/auth-core.module';
import { UserCoreModule } from './user/core/user-core.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/starter'),
    AuthCoreModule,
    UserCoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
