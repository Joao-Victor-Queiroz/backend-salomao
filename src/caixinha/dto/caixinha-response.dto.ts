import { ApiProperty } from '@nestjs/swagger';

export class CaixinhaResponseDto {
  @ApiProperty({ example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283', description: 'ID único do registro da caixinha' })
  id: string;

  @ApiProperty({ example: 'a1b07384-b113-4ec5-c5e2-9e8c45963212', description: 'ID do crismando associado' })
  crismandoId: string;

  @ApiProperty({ example: 50.0, description: 'Valor pago pelo crismando' })
  valorPago: number;

  @ApiProperty({ example: '2026-07-09T00:00:00.000Z', description: 'Data do pagamento' })
  dataPagamento: Date;
}
