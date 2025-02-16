import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterTraditionalRequest } from './dto/register-traditional.dto';
import { UserWriteService } from '../../user/write/user-write.service';
import { LoginTraditionalRequest } from './dto/login-traditional.dto';
import { UserReadService } from '../../user/read/user-read.service';
import { AuthMethod } from '../../user/core/enum/auth-method.enum';
import { TokenResponse } from './dto/token.dto';
import { CustomJwtService } from '../custom-jwt/custom-jwt.service';

@Injectable()
export class AuthTraditionalService {
  constructor(
    private readonly userWriteService: UserWriteService,
    private readonly userReadService: UserReadService,
    private readonly jwtService: CustomJwtService,
  ) {}

  public async register(
    dto: RegisterTraditionalRequest,
  ): Promise<TokenResponse> {
    const user = await this.userWriteService.createUser({ email: dto.email });

    const token = await this.jwtService.sign({ userId: user.id });

    return {
      token,
    };
  }

  public async login(dto: LoginTraditionalRequest): Promise<TokenResponse> {
    const user = await this.userReadService.readUserByEmail(dto.email);

    if (user.authMethod !== AuthMethod.Traditional) {
      throw new ForbiddenException(
        'User is not registered with traditional auth method',
      );
    }

    if (!user.passwordHash) {
      throw new Error('User does not have password set');
    }

    if (!this.passwordMatchesHash(dto.password, user.passwordHash)) {
      throw new Error('Invalid password');
    }

    const token = await this.jwtService.sign({ userId: user.id });

    return { token };
  }

  private passwordMatchesHash(password: string, passwordHash: string): boolean {
    return true;
  }
}
