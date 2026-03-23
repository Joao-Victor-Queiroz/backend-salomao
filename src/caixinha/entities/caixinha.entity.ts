import { ApiProperty } from '@nestjs/swagger';

export class Caixinha {
  @ApiProperty()
  id: string;

  @ApiProperty()
  crismandoId: string;

  @ApiProperty()
  valorPago: number;

  @ApiProperty()
  dataPagamento: Date;
}
