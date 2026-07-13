import { ApiProperty } from '@nestjs/swagger';
import { Frequencia } from '../entities/frequencia.entity';

export class FrequenciaCrismandoResponseDto {
  @ApiProperty({ type: [Frequencia], description: 'Lista de frequências do crismando' })
  frequencias: Frequencia[];

  @ApiProperty({ example: 'João Silva', description: 'Nome do crismando' })
  nomeCrismando: string;
}
