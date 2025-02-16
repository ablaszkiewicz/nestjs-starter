import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from './mongo-in-memory-server';
import { AuthCoreModule } from './../../src/auth/core/auth-core.module';
import { getModelToken } from '@nestjs/mongoose';
import { UserEntity } from '../../src/user/core/entities/user.entity';

export async function createAppModule() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), AuthCoreModule],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  const userModel = module.get(getModelToken(UserEntity.name));

  return {
    app,
    module,
    models: {
      userModel,
    },
  };
}
