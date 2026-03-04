import { Injectable } from '@nestjs/common';
import { CreateAnimadorDto } from './dto/create-animador.dto';
// import { UpdateAnimadorDto } from './dto/update-animador.dto';
import { PrismaService } from 'src/prisma.service';
import { Animador } from '../generated/prisma/client';

@Injectable()
export class AnimadoresService {
  constructor(private prisma: PrismaService) {}

  async criarAnimador(data: CreateAnimadorDto): Promise<Animador> {
    return this.prisma.animador.create({
      data,
    });
  }

  async vincularAnimadorAoGrupo(
    animadorId: string,
    grupoId: string,
  ): Promise<void> {
    await this.prisma.animador.update({
      where: { id: animadorId },
      data: {
        grupoId: grupoId,
      },
    });
  }

  findAll() {
    return `This action returns all animadores`;
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

  findOne(id: number) {
    return `This action returns a #${id} animador`;
  }

  // update(id: number, updateAnimadorDto: UpdateAnimadorDto) {
  //   return `This action updates a #${id} animador`;
  // }

  remove(id: number) {
    return `This action removes a #${id} animador`;
  }
}
