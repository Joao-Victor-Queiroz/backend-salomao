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

export type AnimadorSemSenha = Omit<Animador, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private animadoresService: AnimadoresService,
    private jwtService: JwtService,
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

    return { accessToken };
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
