import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';

interface Payload {
  sub: string;
  cargo: string;
}

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
    const user = await this.prisma.animador.findUnique({
      where: { id: payload.sub },
      omit: { password: true },
    });

    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('Usuário encontrado: ', user);
    return user;
  }
}
