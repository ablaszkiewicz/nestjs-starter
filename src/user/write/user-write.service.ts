import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../core/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from '../core/entities/user.interface';

@Injectable()
export class UserWriteService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const user = await this.userModel.create({
      email: dto.email,
      passwordHash: dto.passwordHash,
    });

    return UserEntity.mapToInterface(user);
  }
}
