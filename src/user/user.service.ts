import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './user-credential.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async signUp(userCredentialDto: UserCredentialDto): Promise<void> {
    return this.userRepository.createUser(userCredentialDto);
  }

  async signIn(userCredentialDto: UserCredentialDto): Promise<User> {
    const { username, password } = userCredentialDto;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException('Please Enter Valid Credentials');
    }
    //
  }
}
