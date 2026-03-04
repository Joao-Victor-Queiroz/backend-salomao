import { Controller, Post, Body, Request } from '@nestjs/common';
import { CreateAnimadorDto } from 'src/animadores/dto/create-animador.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateAnimadorDto) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  async signin(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }
}
