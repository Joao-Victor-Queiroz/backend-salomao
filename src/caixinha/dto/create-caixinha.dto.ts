import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsPositive, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCaixinhaDto {
  @ApiProperty({ example: 'a1b07384-b113-4ec5-c5e2-9e8c45963212', description: 'ID do crismando associado' })
  @IsString()
  @IsNotEmpty()
  crismandoId: string;

  @ApiProperty({ example: 50.0, description: 'Valor pago pelo crismando' })
  @IsNumber()
  @IsPositive()
  valorPago: number;

  @ApiProperty({ example: '2026-07-09', description: 'Data do pagamento no formato YYYY-MM-DD' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dataPagamento: Date;
}