import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Headers,
  Ip,
  Request,
  Get,
} from '@nestjs/common';
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
  signin(
    @Body() body: { email: string; password: string },
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.signIn(body.email, body.password, ip, userAgent);
  }

  @Public()
  @Post('refresh-token')
  refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não encontrado.');
    }

    return this.authService.refreshToken(refreshToken, ip, userAgent);
  }

  @Public()
  @Post('logout')
  logout(@Body('refreshToken') refreshToken: string) {
    if (refreshToken) {
      return this.authService.logout(refreshToken);
    }
  }

  @Get('me')
  myProfile(@Request() req: { user: { id: string } }) {
    return this.authService.myProfile(req.user.id);
  }
}
