import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PrismaService } from 'src/prisma.service';
import { AddCrismandosDto } from './dto/add-crismandos.dto';

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
    return this.prisma.grupo.findMany();
  }

  findOne(id: string) {
    return this.prisma.grupo.findUnique({
      where: { id: id },
      include: {
        crismandos: {
          orderBy: { nomeCrismando: 'asc' },
          select: {
            id: true,
            nomeCrismando: true,
            idade: true,
          },
        },
      },
    });
  }

  async addCrismandos(id: string, addCrismandosDto: AddCrismandosDto) {
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
      where: { id: id },
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

  remove(id: string) {
    return this.prisma.grupo.delete({
      where: { id: id },
    });
  }
}
