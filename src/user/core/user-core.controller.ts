import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/core/guards/auth.gurad';
import { CurrentUserId } from '../../auth/core/decorators/current-user-id.decorator';
import { UserReadService } from '../read/user-read.service';
import { IUser } from './entities/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userReadService: UserReadService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  public async readCurrentUser(@CurrentUserId() userId): Promise<IUser> {
    const user = await this.userReadService.readById(userId);

    return user;
  }
}
