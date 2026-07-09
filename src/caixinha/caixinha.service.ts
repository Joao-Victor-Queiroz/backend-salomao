import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaixinhaDto } from './dto/create-caixinha.dto';
import { UpdateCaixinhaDto } from './dto/update-caixinha.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CaixinhaService {
  constructor(private prisma: PrismaService) {}

  create(createCaixinhaDto: CreateCaixinhaDto) {
    return this.prisma.caixinha.create({
      data: createCaixinhaDto,
    });
  }

  async findOne(id: string) {
    const caixinha = await this.prisma.caixinha.findUnique({
      where: { id: id },
    });

    if (!caixinha) {
      throw new NotFoundException('Registro de caixinha não encontrado.');
    }

    return caixinha;
  }

  update(id: string, updateCaixinhaDto: UpdateCaixinhaDto) {
    return this.prisma.caixinha.update({
      where: { id: id },
      data: updateCaixinhaDto,
    });
  }

  remove(id: string) {
    return this.prisma.caixinha.delete({
      where: { id: id },
    });
  }
}
