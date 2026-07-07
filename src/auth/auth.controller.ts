import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Headers,
  Ip,
  Request,
  Get,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnimadorDto } from 'src/animadores/dto/create-animador.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/is-public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { type AnimadorSemSenha } from './jwt.strategy';
import { GetUser } from './decorators/user.decorator';
import {
  ApiSignupDecorator,
  ApiSigninDecorator,
  ApiRefreshTokenDecorator,
  ApiLogoutDecorator,
  ApiChangePasswordDecorator,
  ApiMeDecorator,
} from './decorators/api-swagger.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiSignupDecorator()
  @Public()
  @Post('signup')
  async signup(@Body() body: CreateAnimadorDto) {
    return this.authService.signUp(body);
  }

  @ApiSigninDecorator()
  @Public()
  @Post('signin')
  signin(
    @Body() signInDto: SignInDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.signIn(signInDto, ip, userAgent);
  }

  @ApiRefreshTokenDecorator()
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

  @ApiLogoutDecorator()
  @Public()
  @Post('logout')
  logout(@Body('refreshToken') refreshToken: string) {
    if (refreshToken) {
      return this.authService.logout(refreshToken);
    }
  }

  @ApiChangePasswordDecorator()
  @Patch('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: AnimadorSemSenha,
  ) {
    return this.authService.changePassword(changePasswordDto, user);
  }

  @ApiMeDecorator()
  @Get('me')
  myProfile(@Request() req: { user: { id: string } }) {
    return this.authService.myProfile(req.user.id);
  }
}
