import { Test, TestingModule } from '@nestjs/testing';
import { AuthCoreController } from './auth-core.controller';

describe('AuthCoreController', () => {
  let authCoreController: AuthCoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthCoreController],
      providers: [],
    }).compile();

    authCoreController = app.get<AuthCoreController>(AuthCoreController);
  });

  it('should pass', () => {
    expect(true).toEqual(true);
  });
});
