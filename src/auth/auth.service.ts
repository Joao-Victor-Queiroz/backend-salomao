import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as crypto from 'node:crypto';
import { SignInDto } from './dto/sign-in.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UsuarioSemSenha } from './jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const doesUserExist = await this.prisma.usuario.findUnique({
      where: { email: createUserDto.email },
    });

    if (doesUserExist) {
      throw new ConflictException('Este email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nome: createUserDto.nome,
        email: createUserDto.email,
        password: hashedPassword,
        cargo: createUserDto.cargo,
        animadorId: createUserDto.animadorId || null,
      },
      include: { animador: true },
    });

    const { password: _, ...userWithoutPassword } = usuario;
    return userWithoutPassword;
  }

  async signIn(signInDto: SignInDto, ip: string, userAgent: string) {
    const { email, password } = signInDto;
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      include: { animador: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, cargo: user.cargo };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      refreshToken: await this.createRefreshToken(user.id, ip, userAgent),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        animadorId: user.animadorId,
        grupoAnimadorId: user.animador?.grupoAnimadorId || null,
        grupoCrismandoId: user.animador?.grupoCrismandoId || null,
      },
    };
  }

  async createRefreshToken(usuarioId: string, ip: string, userAgent: string) {
    const durationInDays = 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationInDays);

    const token = crypto.randomUUID();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await this.prisma.refreshToken.create({
      data: {
        token: hashedToken,
        usuarioId: usuarioId,
        expiresAt: expiresAt,
        ipAdress: ip,
        userAgent: userAgent,
      },
    });

    return token;
  }

  async myProfile(userId: string) {
    console.log('Id recebido: ', userId);

    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      omit: { password: true },
      include: { animador: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      ...user,
      grupoAnimadorId: user.animador?.grupoAnimadorId || null,
      grupoCrismandoId: user.animador?.grupoCrismandoId || null,
    };
  }

  async refreshToken(token: string, ip: string, userAgent: string) {
    console.log('--- REFRESH TOKEN INICIADO ---');
    console.log('Token original recebido pelo front:', token);

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log('Hash gerado para busca:', hashedToken);

    const tokenData = await this.prisma.refreshToken.findFirst({
      where: { token: hashedToken },
      include: { usuario: true },
    });

    if (!tokenData) {
      console.log('Erro: Nenhum tokenData encontrado no banco para este hash.');
      throw new UnauthorizedException('Token inválido');
    }

    console.log(
      'Token encontrado no banco. Pertence ao usuário ID:',
      tokenData.usuarioId,
    );

    if (tokenData.ipAdress !== ip || tokenData.userAgent !== userAgent) {
      await this.prisma.refreshToken.delete({
        where: { id: tokenData.id },
      });
      throw new UnauthorizedException(
        'Sessão inválida. Por favor, faça login novamente.',
      );
    }

    if (tokenData.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({
        where: { id: tokenData.id },
      });
      throw new UnauthorizedException('Token expirado');
    }

    if (tokenData.revokedAt !== null) {
      await this.prisma.refreshToken.delete({
        where: { id: tokenData.id },
      });
      throw new UnauthorizedException('Token revogado');
    }

    await this.prisma.refreshToken.delete({
      where: { id: tokenData.id },
    });

    const newRefreshToken = await this.createRefreshToken(
      tokenData.usuario.id,
      ip,
      userAgent,
    );

    const payload = {
      sub: tokenData.usuario.id,
      cargo: tokenData.usuario.cargo,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, newRefreshToken };
  }

  async logout(token: string) {
    console.log('Token recebido: ', token);
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    console.log('Hashed token: ', hashedToken);

    const tokenData = await this.prisma.refreshToken.findFirst({
      where: { token: hashedToken },
    });

    console.log('Token: ', tokenData);

    if (tokenData) {
      await this.prisma.refreshToken.delete({
        where: { id: tokenData.id },
      });
    }

    return { message: 'Logout realizado com sucesso.' };
  }

  async changePassword(changePasswordDto: ChangePasswordDto, user: UsuarioSemSenha) {
    const { senhaAtual, novaSenha } = changePasswordDto;
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: user.id },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const doesPasswordMatch = await bcrypt.compare(senhaAtual, usuario.password);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Houve um erro ao tentar atualizar a senha.');
    }

    const newHashedPassword = await bcrypt.hash(novaSenha, 10);

    if (newHashedPassword === usuario.password) {
      throw new UnauthorizedException('A nova senha não pode ser igual a senha atual.');
    }

    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { password: newHashedPassword },
    });

    return { message: 'Senha atualizada com sucesso.' };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (doesPasswordMatch) {
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }
}
