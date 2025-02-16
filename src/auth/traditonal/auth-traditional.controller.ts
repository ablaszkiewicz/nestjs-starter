import { Controller, Get, Post } from '@nestjs/common';
import { AuthTraditionalService } from './auth-traditional.service';

@Controller('auth/traditional')
export class AuthTraditionalController {
  constructor(private readonly service: AuthTraditionalService) {}

  @Post('')
  public async register() {
    return this.service.register({ email: 'test@test.com' });
  }
}
