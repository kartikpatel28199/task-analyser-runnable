import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialDto } from './user-credential.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body() userCredentialDto: UserCredentialDto): Promise<void> {
    return this.userService.signUp(userCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body() userCredentialDto: UserCredentialDto,
  ): Promise<{ accessToken: string }> {
    console.log('User requested');
    return this.userService.signIn(userCredentialDto);
  }
}
