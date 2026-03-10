import { Injectable } from '@nestjs/common';
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
          select: {
            id: true,
            nomeCrismando: true,
            idade: true,
          },
        },
      },
    });
  }

  addCrismandos(id: string, addCrismandosDto: AddCrismandosDto) {
    return this.prisma.grupo.update({
      where: { id: id },
      data: {
        crismandos: {
          connect: addCrismandosDto.crismandos.map((crismando) => ({
            id: crismando,
          })),
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
