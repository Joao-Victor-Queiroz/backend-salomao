import { StatusFrequencia } from 'src/generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
export class Frequencia {
  @ApiProperty()
  id: string;

  @ApiProperty()
  crismandoId: string;

  @ApiProperty()
  status: StatusFrequencia;

  @ApiProperty()
  dataFrequencia: Date;

  @ApiProperty({ required: false })
  justificativa?: string | null;
}
