import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthCoreModule } from './auth/core/auth-core.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/starter'),
    AuthCoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
