import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { registerDto } from './dto/index.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOneOrFail({ where: { email } });
  }

  async create(user: registerDto): Promise<User> {
    const newUser = this.userModel.create(user);
    return await this.userModel.save(newUser);
  }
}
