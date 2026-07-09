import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimadorDto } from './dto/create-animador.dto';
import { UpdateAnimadorDto } from './dto/update-animador.dto';
import { PrismaService } from 'src/prisma.service';
import { Animador, Cargo } from '../generated/prisma/client';
import type { AnimadorSemSenha } from 'src/auth/jwt.strategy';

const GRUPO_ID = process.env.GRUPO_ANIMADORES_ID;
@Injectable()
export class AnimadoresService {
  constructor(private prisma: PrismaService) {}

  async criarAnimador(data: CreateAnimadorDto): Promise<Animador> {
    return this.prisma.animador.create({
      data: {
        ...data,
        grupoAnimador: {
          connect: {
            id: GRUPO_ID,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.animador.findMany({
      omit: { password: true },
    });
  }

  findAnimadoresSemGrupo() {
    return this.prisma.animador.findMany({
      where: { grupoCrismandoId: null },
    });
  }

  async findAnimador(email: string): Promise<Animador | null> {
    return this.prisma.animador.findUnique({
      where: { email: email },
    });
  }

  async findById(id: string): Promise<Animador | null> {
    return this.prisma.animador.findUnique({
      where: { id: id },
    });
  }

  async findOne(id: string) {
    const animador = await this.prisma.animador.findUnique({
      where: { id: id },
      omit: { password: true },
    });

    if (!animador) {
      throw new NotFoundException('Animador não encontrado.');
    }

    return animador;
  }

  update(id: string, updateAnimadorDto: UpdateAnimadorDto, user: AnimadorSemSenha) {
    if (!this.canAccess(id, user)) {
      throw new ForbiddenException('Você não pode atualizar este animador');
    }

    return this.prisma.animador.update({
      where: { id: id },
      data: updateAnimadorDto,
    });
  }

  removeAnimador(id: string, user: AnimadorSemSenha) {
    if (!this.canAccess(id, user)) {
      throw new ForbiddenException('Você não pode excluir este animador');
    }

    return this.prisma.animador.delete({
      where: { id: id },
    });
  }

  private canAccess(targetId: string, user: AnimadorSemSenha): boolean {
    const isUser = user.id === targetId;
    const hasRequiredRole = (
      [Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA] as Cargo[]
    ).includes(user.cargo);

    return isUser || hasRequiredRole;
  }
}
