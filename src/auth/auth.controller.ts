import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Headers,
  Ip,
} from '@nestjs/common';
import { CreateAnimadorDto } from 'src/animadores/dto/create-animador.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/is-public.decorator';
import type { Response } from 'express';
import { Cookies } from './decorators/cookie.decorator';
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
  async signin(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.signIn(
      body.email,
      body.password,
      ip,
      userAgent,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, user };
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não encontrado.');
    }

    const tokens = await this.authService.refreshToken(
      refreshToken,
      ip,
      userAgent,
    );

    res.cookie('refreshToken', tokens.newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Post('logout')
  async logout(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Logout realizado com sucesso.' };
  }
}
