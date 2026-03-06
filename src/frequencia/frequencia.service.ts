import { Injectable } from '@nestjs/common';
import { CreateFrequenciaDto } from './dto/create-frequencia.dto';
import { UpdateFrequenciaDto } from './dto/update-frequencia.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FrequenciaService {
  constructor(private prisma: PrismaService) {}

  registerFrequencia(createFrequenciaDto: CreateFrequenciaDto) {
    const { dataFrequencia, frequencias } = createFrequenciaDto;

    const dadosConvertidos = frequencias.map((frequencia) => ({
      crismandoId: frequencia.crismandoId,
      status: frequencia.status,
      justificativa: frequencia.justificativa,
      dataFrequencia: dataFrequencia,
    }));

    return this.prisma.frequencia.createMany({
      data: dadosConvertidos,
    });
  }

  findOne(id: string) {
    return this.prisma.frequencia.findUnique({
      where: { id: id },
    });
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
