import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimadorDto } from './dto/create-animador.dto';
import { UpdateAnimadorDto } from './dto/update-animador.dto';
import { PrismaService } from 'src/prisma.service';
import { Animador, Cargo } from '../generated/prisma/client';
import type { UsuarioSemSenha } from 'src/auth/jwt.strategy';

const GRUPO_ID = process.env.GRUPO_ANIMADORES_ID;
@Injectable()
export class AnimadoresService {
  constructor(private prisma: PrismaService) {}

  async criarAnimador(data: CreateAnimadorDto): Promise<Animador> {
    return this.prisma.animador.create({
      data: {
        ...data,
        ...(GRUPO_ID
          ? {
              grupoAnimador: {
                connect: { id: GRUPO_ID },
              },
            }
          : {}),
      },
    });
  }

  findAll() {
    return this.prisma.animador.findMany({
      include: { usuario: true },
    });
  }

  findAnimadoresSemGrupo() {
    return this.prisma.animador.findMany({
      where: { grupoCrismandoId: null },
    });
  }

  async findById(id: string): Promise<Animador | null> {
    return this.prisma.animador.findUnique({
      where: { id: id },
      include: { usuario: true },
    });
  }

  async findOne(id: string) {
    const animador = await this.prisma.animador.findUnique({
      where: { id: id },
      include: { usuario: true },
    });

    if (!animador) {
      throw new NotFoundException('Animador não encontrado.');
    }

    return animador;
  }

  update(id: string, updateAnimadorDto: UpdateAnimadorDto, user: UsuarioSemSenha) {
    if (!this.canAccess(id, user)) {
      throw new ForbiddenException('Você não pode atualizar este animador');
    }

    return this.prisma.animador.update({
      where: { id: id },
      data: updateAnimadorDto,
    });
  }

  removeAnimador(id: string, user: UsuarioSemSenha) {
    if (!this.canAccess(id, user)) {
      throw new ForbiddenException('Você não pode excluir este animador');
    }

    return this.prisma.animador.delete({
      where: { id: id },
    });
  }

  private canAccess(targetId: string, user: UsuarioSemSenha): boolean {
    const isOwner = user.animadorId === targetId;
    const hasRequiredRole = (
      [Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA, Cargo.ADMIN] as Cargo[]
    ).includes(user.cargo);

    return isOwner || hasRequiredRole;
  }
}
