import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { createAppModule } from '../../../test/utils/bootstrap';
import { closeInMemoryMongoServer } from '../../../test/utils/mongo-in-memory-server';
import { UserEntity } from '../../user/core/entities/user.entity';
import { Model, Types } from 'mongoose';

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

  it('registers user and logs him in', async () => {
    // when
    const response = await request(app.getHttpServer()).post(
      '/auth/traditional/register',
    );

    // then
    const user = (await userModel.findOne())!;

    expect(response.body.token).toContain('ey');
    expect(user._id).toBeInstanceOf(Types.ObjectId);

    console.log('response.body.token', response.body.token);
  });
});
