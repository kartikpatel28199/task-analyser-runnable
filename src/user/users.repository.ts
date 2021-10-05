import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialDto } from './user-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userCredentialDto: UserCredentialDto): Promise<void> {
    const { username, password } = userCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('User Already Exist');
      }
    }
  }
}
