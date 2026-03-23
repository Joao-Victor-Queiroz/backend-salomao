import { Injectable } from '@nestjs/common';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';
import { PrismaService } from 'src/prisma.service';

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

  updateCrismando(id: string, updateCrismandoDto: UpdateCrismandoDto) {
    return this.prisma.crismando.update({
      data: updateCrismandoDto,
      where: { id: id },
    });
  }

  removeCrismando(id: string) {
    return this.prisma.crismando.delete({
      where: { id: id },
    });
  }
}
