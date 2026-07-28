import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cargo } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';
import { Usuario } from 'src/generated/prisma/client';

export interface Payload {
  sub: string;
  cargo: Cargo;
}

export type UsuarioSemSenha = Omit<Usuario, 'password'>;
export type AnimadorSemSenha = UsuarioSemSenha;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: Payload) {
    console.log('Payload extraído: ', payload);
    const user = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      omit: { password: true },
      include: { animador: true },
    });

    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('Usuário encontrado: ', user);
    return user;
  }
}
