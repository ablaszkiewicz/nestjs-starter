import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { closeInMemoryMongoServer } from '../../test/mongo-in-memory-server';
import { UserEntity } from '../../user/core/entities/user.entity';
import { Model, Types } from 'mongoose';
import { AuthUtils } from '../../test/auth-utils';
import { createTestApp } from '../../test/bootstrap';

describe('AuthTraditionalController', () => {
  let app: INestApplication<App>;
  let userModel: Model<UserEntity>;
  let authUtils: AuthUtils;

  beforeAll(async () => {
    const result = await createTestApp();

    app = result.app;
    userModel = result.models.userModel;
    authUtils = new AuthUtils(app);
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
    const response = await request(app.getHttpServer())
      .post('/auth/traditional/register')
      .send({
        email: 'test@test.com',
        password: 'password',
      });

    // then
    const user = (await userModel.findOne())!;

    expect(response.body.token).toContain('ey');
    expect(user.email).toEqual('test@test.com');
  });

  it('logs user in with correct password', async () => {
    // given
    await authUtils.registerUser({
      email: 'test@test.com',
      password: 'password',
    });

    // when
    const response = await request(app.getHttpServer())
      .post('/auth/traditional/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      });

    // then
    expect(response.body.token).toContain('ey');
  });

  it('does not log user in with incorrect password', async () => {
    // given
    await authUtils.registerUser({
      email: 'test@test.com',
      password: 'password',
    });

    // when
    const response = await request(app.getHttpServer())
      .post('/auth/traditional/login')
      .send({
        email: 'test@test.com',
        password: 'incorrect',
      });

    // then
    expect(response.status).toBe(401);
  });
});
