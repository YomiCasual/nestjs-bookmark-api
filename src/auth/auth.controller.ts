import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() body: any) {
    return this.authService.signin({ body });
  }
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup({ body });
  }
}
