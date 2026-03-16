import { Controller, Post, Body, Request } from '@nestjs/common';
import { CreateAnimadorDto } from 'src/animadores/dto/create-animador.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: CreateAnimadorDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('signin')
  async signin(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }
}
