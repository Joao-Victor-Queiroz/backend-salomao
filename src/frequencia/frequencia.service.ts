import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateFrequenciaDto } from './dto/create-frequencia.dto';
import { UpdateFrequenciaDto } from './dto/update-frequencia.dto';
import { CreateAnimadorFrequenciaDto } from './dto/register-frequencia-animador.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FrequenciaService {
  constructor(private prisma: PrismaService) {}

  registerFrequenciaCrismando(createFrequenciaDto: CreateFrequenciaDto) {
    const { dataFrequencia, frequencias } = createFrequenciaDto;

    const dadosConvertidos = frequencias.map((frequencia) => ({
      crismandoId: frequencia.crismandoId,
      status: frequencia.status,
      justificativa: frequencia.justificativa,
      dataFrequencia: new Date(dataFrequencia),
    }));

    return this.prisma.frequencia.createMany({
      data: dadosConvertidos,
      skipDuplicates: true,
    });
  }

  async registerFrequenciaAnimador(
    createFrequenciaAnimadorDto: CreateAnimadorFrequenciaDto,
  ) {
    const { dataFrequencia, frequencias } = createFrequenciaAnimadorDto;
    const targetDate = new Date(dataFrequencia);

    const tipos = Array.from(new Set(frequencias.map((f) => f.tipo)));
    const animadorIds = frequencias.map((f) => f.animadorId);

    const existing = await this.prisma.frequenciaAnimador.findFirst({
      where: {
        dataFrequencia: targetDate,
        tipo: { in: tipos },
        animadorId: { in: animadorIds },
      },
    });

    if (existing) {
      const dataFormatada = targetDate.toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      });
      const tipoNome = existing.tipo === 'ENCONTRO' ? 'ENCONTRO' : 'FORMAÇÃO';
      throw new ConflictException(
        `Já existe um registro de frequência do tipo ${tipoNome} para a data ${dataFormatada}.`,
      );
    }

    const dadosConvertidos = frequencias.map((frequencia) => ({
      animadorId: frequencia.animadorId,
      status: frequencia.status,
      tipo: frequencia.tipo,
      justificativa: frequencia.justificativa,
      dataFrequencia: targetDate,
    }));

    return this.prisma.frequenciaAnimador.createMany({
      data: dadosConvertidos,
      skipDuplicates: true,
    });
  }
  
  async findFrequenciaFromUniqueCrismando(idCrismando: string) {
    const crismando = await this.prisma.crismando.findUnique({
      where: { id: idCrismando },
      include: {
        frequencias: true,
      },
    });

    if (!crismando) {
      throw new NotFoundException('Crismando não encontrado.');
    }

    return {
      frequencias: crismando.frequencias,
      nomeCrismando: crismando.nomeCrismando,
    };
  }

  async findOne(id: string) {
    const frequencia = await this.prisma.frequencia.findUnique({
      where: { id: id },
    });

    if (!frequencia) {
      throw new NotFoundException('Frequência não encontrada.');
    }

    return frequencia;
  }

  updateFrequencia(id: string, updateFrequenciaDto: UpdateFrequenciaDto) {
    return this.prisma.frequencia.update({
      where: { id: id },
      data: updateFrequenciaDto,
    });
  }

  removeFrequencia(id: string) {
    return this.prisma.frequencia.delete({
      where: { id: id },
    });
  }
}
