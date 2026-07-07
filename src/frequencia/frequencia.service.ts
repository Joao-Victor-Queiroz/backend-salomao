import { Injectable } from '@nestjs/common';
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

  registerFrequenciaAnimador(
    createFrequenciaAnimadorDto: CreateAnimadorFrequenciaDto,
  ) {
    const { dataFrequencia, frequencias } = createFrequenciaAnimadorDto;

    const dadosConvertidos = frequencias.map((frequencia) => ({
      animadorId: frequencia.animadorId,
      status: frequencia.status,
      tipo: frequencia.tipo,
      justificativa: frequencia.justificativa,
      dataFrequencia: new Date(dataFrequencia),
    }));

    return this.prisma.frequenciaAnimador.createMany({
      data: dadosConvertidos,
      skipDuplicates: true,
    });
  }
  
  findFrequenciaFromUniqueCrismando(idCrismando: string){
    return this.prisma.frequencia.findMany({
      where: {crismandoId: idCrismando},
    })
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
