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
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssociarAnimadorDto } from './dto/associar-animador.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/is-public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { type UsuarioSemSenha } from './jwt.strategy';
import { GetUser } from './decorators/user.decorator';
import {
  ApiSignupDecorator,
  ApiSigninDecorator,
  ApiRefreshTokenDecorator,
  ApiLogoutDecorator,
  ApiChangePasswordDecorator,
  ApiMeDecorator,
  ApiFindAllUsersDecorator,
  ApiUpdateUserDecorator,
  ApiAssociarAnimadorDecorator,
} from './decorators/api-swagger.decorator';
import { Cargo } from 'src/generated/prisma/enums';
import { Role } from './decorators/roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiSignupDecorator()
  @Public()
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
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
    @GetUser() user: UsuarioSemSenha,
  ) {
    return this.authService.changePassword(changePasswordDto, user);
  }

  @ApiMeDecorator()
  @Get('me')
  myProfile(@Request() req: { user: { id: string } }) {
    return this.authService.myProfile(req.user.id);
  }

  @ApiFindAllUsersDecorator()
  @Get('usuarios')
  @Role(Cargo.ADMIN, Cargo.COORDENADOR_GERAL)
  findAllUsers() {
    return this.authService.findAllUsers();
  }

  @ApiUpdateUserDecorator()
  @Patch('usuarios/:id')
  @Role(Cargo.ADMIN, Cargo.COORDENADOR_GERAL)
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @ApiAssociarAnimadorDecorator()
  @Patch('usuarios/:id/associar-animador')
  @Role(Cargo.ADMIN, Cargo.COORDENADOR_GERAL)
  associarAnimador(
    @Param('id') id: string,
    @Body() associarAnimadorDto: AssociarAnimadorDto,
  ) {
    return this.authService.associarAnimador(id, associarAnimadorDto.animadorId);
  }
}


