import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PrismaService } from 'src/prisma.service';
import { AddCrismandosDto } from './dto/add-crismandos.dto';
import { AddAnimadoresDto } from './dto/add-animadores.dto';

const GRUPO_ID = process.env.GRUPO_ANIMADORES_ID;
@Injectable()
export class GrupoService {
  constructor(private prisma: PrismaService) {}

  createGrupo(createGrupoDto: CreateGrupoDto) {
    return this.prisma.grupo.create({
      data: {
        nomeGrupo: createGrupoDto.nomeGrupo,
      },
    });
  }

  findAll() {
    return this.prisma.grupo.findMany({
      orderBy: { nomeGrupo: 'asc' },
    });
  }

  async findGrupoCrismandos(id: string) {
    const grupo = await this.prisma.grupo.findUnique({
      where: { id: id },
      include: {
        crismandos: {
          orderBy: { nomeCrismando: 'asc' },
          select: {
            id: true,
            nomeCrismando: true,
            idade: true,
            caixinhas: true,
            frequencias: true,
            batizado: true,
            primeiraEucaristia: true,
          },
        },
        animadoresMinisterio: {
          orderBy: { nomeAnimador: 'asc' },
          select: {
            id: true,
            nomeAnimador: true,
          },
        },
      },
    });

    if (!grupo) {
      throw new NotFoundException('Grupo não encontrado.');
    }

    return grupo;
  }

  async findGrupoAnimadoresFrequencia() {
    const grupoAnimadores = await this.prisma.grupo.findUnique({
      where: { id: GRUPO_ID },
      include: {
        animadoresFrequencia: {
          orderBy: { nomeAnimador: 'asc' },
          select: {
            id: true,
            nomeAnimador: true,
          },
        },
      },
    });

    if (!grupoAnimadores) {
      throw new NotFoundException('Grupo não encontrado.');
    }

    return grupoAnimadores;
  }

  async addAnimadores(idGrupo: string, addAnimadoresDto: AddAnimadoresDto) {
    const animadoresJaAlocados = await this.prisma.animador.findMany({
      where: {
        id: { in: addAnimadoresDto.animadores },
        grupoCrismandoId: { not: null },
      },
      select: {
        id: true,
      },
    });

    if (animadoresJaAlocados.length > 0) {
      const ids = animadoresJaAlocados
        .map((animador) => animador.id)
        .join(', ');
      throw new BadRequestException(
        'Os seguintes ids estão em um grupo: ',
        ids,
      );
    }

    return this.prisma.grupo.update({
      where: { id: idGrupo },
      data: {
        animadoresMinisterio: {
          connect: addAnimadoresDto.animadores.map((animador) => ({
            id: animador,
          })),
        },
      },
    });
  }

  async addCrismandos(idGrupo: string, addCrismandosDto: AddCrismandosDto) {
    const crismandosJaAlocados = await this.prisma.crismando.findMany({
      where: {
        id: { in: addCrismandosDto.crismandos },
        grupoId: { not: null },
      },
      select: {
        id: true,
      },
    });

    if (crismandosJaAlocados.length > 0) {
      const ids = crismandosJaAlocados
        .map((crismando) => crismando.id)
        .join(', ');
      throw new BadRequestException(
        'Os seguintes ids estão em um grupo: ',
        ids,
      );
    }

    return this.prisma.grupo.update({
      where: { id: idGrupo },
      data: {
        crismandos: {
          connect: addCrismandosDto.crismandos.map((crismando) => ({
            id: crismando,
          })),
        },
      },
      include: {
        crismandos: true,
      },
    });
  }

  removerCrismando(idGrupo: string, idCrismando: string) {
    return this.prisma.grupo.update({
      where: { id: idGrupo },
      data: {
        crismandos: {
          disconnect: {
            id: idCrismando,
          },
        },
      },
    });
  }

  update(id: string, updateGrupoDto: UpdateGrupoDto) {
    return this.prisma.grupo.update({
      where: { id: id },
      data: {
        nomeGrupo: updateGrupoDto.nomeGrupo,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.grupo.delete({
      where: { id: id },
    });
  }
}
