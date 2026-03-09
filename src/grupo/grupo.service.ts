import { Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PrismaService } from 'src/prisma.service';

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
