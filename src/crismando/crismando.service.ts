import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';
import { PrismaService } from 'src/prisma.service';
import { Payload } from 'src/auth/jwt.strategy';
import { Cargo } from 'src/generated/prisma/enums';

@Injectable()
export class CrismandoService {
  constructor(private prisma: PrismaService) {}

  createCrismando(createCrismandoDto: CreateCrismandoDto) {
    return this.prisma.crismando.create({
      data: createCrismandoDto,
    });
  }

  async findAllCrismandos() {
    const crismandos = await this.prisma.crismando.findMany({
      select: {
        id: true,
        nomeCrismando: true,
        idade: true,
        dataNascimento: true,
        ativo: true,
        grupo: {
          select: {
            nomeGrupo: true,
          },
        },
      },
    });

    return crismandos.map((crismando) => ({
      id: crismando.id,
      nomeCrismando: crismando.nomeCrismando,
      idade: crismando.idade,
      dataNascimento: crismando.dataNascimento,
      ativo: crismando.ativo,
      nomeGrupo: crismando.grupo?.nomeGrupo || 'Sem Grupo',
    }));
  }

  findOneCrismando(id: string) {
    return this.prisma.crismando.findUnique({
      where: { id: id },
      include: {
        grupo: {
          select: {
            nomeGrupo: true,
          },
        },
        frequencias: true,
        caixinhas: true,
      },
    });
  }

  async updateCrismando(
    idCrismando: string,
    updateCrismandoDto: UpdateCrismandoDto,
    user: Payload,
  ) {
    const crismando = await this.prisma.crismando.findUnique({
      where: { id: idCrismando },
    });

    if (!crismando) {
      throw new NotFoundException('Crismando não encontrado.');
    }

    const userHasRoles =
      user.cargo === Cargo.COORDENADOR_GERAL ||
      user.cargo === Cargo.COORDENADOR_FREQUENCIA;
    const userGroup = user.grupoId;

    if (!userHasRoles && crismando.grupoId !== userGroup) {
      throw new ForbiddenException(
        'Você não tem permissãoo para editar este crismando',
      );
    }

    return this.prisma.crismando.update({
      data: updateCrismandoDto,
      where: { id: idCrismando },
    });
  }

  async removeCrismando(idCrismando: string, user: Payload) {
    const crismando = await this.prisma.crismando.findUnique({
      where: { id: idCrismando },
    });

    if (!crismando) {
      throw new NotFoundException('Crismando não encontrado.');
    }

    const userHasRoles =
      user.cargo === Cargo.COORDENADOR_GERAL ||
      user.cargo === Cargo.COORDENADOR_FREQUENCIA;
    const userGroup = user.grupoId;

    if (!userHasRoles && crismando.grupoId !== userGroup) {
      throw new ForbiddenException(
        'Você não tem permissãoo para excluir este crismando',
      );
    }

    return this.prisma.crismando.delete({
      where: { id: idCrismando },
    });
  }
}
