import { ApiProperty } from '@nestjs/swagger';

export class BatchPayloadDto {
  @ApiProperty({ example: 10, description: 'Quantidade de registros processados com sucesso' })
  count: number;
}
