import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './user-credential.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCredentialDto: UserCredentialDto): Promise<void> {
    return this.userRepository.createUser(userCredentialDto);
  }

  async signIn(
    userCredentialDto: UserCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = userCredentialDto;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please Enter Valid Credentials');
    }
    //
  }
}
