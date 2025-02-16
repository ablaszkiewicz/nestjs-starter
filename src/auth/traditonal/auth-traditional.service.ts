import { Injectable } from '@nestjs/common';
import { RegisterTraditioonalDto } from './dto/register-traditional.dto';
import { UserWriteService } from '../../user/write/user-write.service';
import { IUser } from '../../user/core/entities/user.interface';

@Injectable()
export class AuthTraditionalService {
  constructor(private readonly userWriteService: UserWriteService) {}

  public async register(dto: RegisterTraditioonalDto): Promise<IUser> {
    const user = await this.userWriteService.createUser({ email: dto.email });

    return user;
  }
}
