import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AnimadoresService } from 'src/animadores/animadores.service';
import * as bcrypt from 'bcrypt';
import { Animador } from 'src/generated/prisma/client';
import { CreateAnimadorDto } from 'src/animadores/dto/create-animador.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as crypto from 'node:crypto';

export type AnimadorSemSenha = Omit<Animador, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private animadoresService: AnimadoresService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(createAnimadorDto: CreateAnimadorDto) {
    const doesUserExist = await this.animadoresService.findAnimador(
      createAnimadorDto.email,
    );

    if (doesUserExist) {
      throw new ConflictException('Este email já está em uso.');
    }

    const { password, ...animadorData } = createAnimadorDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.animadoresService.criarAnimador({
      ...animadorData,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    const animador = await this.animadoresService.findAnimador(email);

    if (!animador) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const doesPasswordMatch = await bcrypt.compare(password, animador.password);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: animador.id, cargo: animador.cargo };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      refreshToken: await this.createRefreshToken(animador.id),
    };
  }

  async createRefreshToken(animadorId: string) {
    const durationInDays = 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationInDays);

    const token = crypto.randomUUID();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await this.prisma.refreshToken.create({
      data: {
        token: hashedToken,
        animadorId: animadorId,
        expiresAt: expiresAt,
      },
    });

    return token;
  }

  async refreshToken(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const tokenData = await this.prisma.refreshToken.findFirst({
      where: { token: hashedToken },
      include: { animador: true },
    });

    if (!tokenData) {
      throw new UnauthorizedException('Token inválido');
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
      tokenData.animador.id,
    );

    const payload = {
      sub: tokenData.animador.id,
      cargo: tokenData.animador.cargo,
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

    if (!tokenData) {
      console.log('Não foi possível encontrar o token');
    }

    console.log('Token: ', tokenData);

    if (tokenData) {
      await this.prisma.refreshToken.delete({
        where: { id: tokenData.id },
      });
      console.log('Token deletado');
    }

    return { message: 'Logout realizado com sucesso.' };
  }

  async validateUser(email: string, password: string) {
    const animador = await this.animadoresService.findAnimador(email);
    if (!animador) {
      return null;
    }
    const doesPasswordMatch = await bcrypt.compare(password, animador.password);

    if (doesPasswordMatch) {
      const { password: _password, ...result } = animador;
      return result;
    }
    return null;
  }
}
