import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { createAppModule } from '../../../test/utils/bootstrap';
import { closeInMemoryMongoServer } from '../../../test/utils/mongo-in-memory-server';
import { UserEntity } from '../../user/core/entities/user.entity';
import { Model } from 'mongoose';

describe('AuthTraditionalController', () => {
  let app: INestApplication<App>;
  let userModel: Model<UserEntity>;

  beforeAll(async () => {
    const result = await createAppModule();

    app = result.app;
    userModel = result.models.userModel;
  });

  beforeEach(async () => {
    await userModel.deleteMany();
  });

  afterAll(async () => {
    await closeInMemoryMongoServer();
    await app.close();
  });

  it('registers user', async () => {
    const response = await request(app.getHttpServer()).post(
      '/auth/traditional',
    );

    console.log(response.body);

    console.log(await userModel.find());
  });
});
