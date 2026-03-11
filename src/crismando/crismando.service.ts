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

  // buscarAniversarios(start: string, end: string) {
  //   if (start > end) {
  //     return this.prisma.$queryRaw`
  //   SELECT * FROM "Crismando"
  //   WHERE (
  //     TO_CHAR("dataNascimento", 'MM-DD') >= ${start}
  //     OR
  //     TO_CHAR("dataNAscimento", 'MM-DD') <= ${end}
  //   )
  //   `;
  //   }
  //   return this.prisma.$queryRawUnsafe(`
  //   SELECT * FROM "Crismando"
  //   WHERE (
  //     TO_CHAR("dataNascimento", 'MM-DD') >= ${start}
  //     AND
  //     TO_CHAR("dataNascimento", 'MM-DD') <= ${end}
  //   )
  //   `);
  // }

  findAllCrismandos() {
    return this.prisma.crismando.findMany();
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
