import { IsString, IsNumber, IsDateString, IsNotEmpty, IsPositive, IsISO8601, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCaixinhaDto {
  @IsString()
  @IsNotEmpty()
  crismandoId: string;

  @IsNumber()
  @IsPositive()
  valorPago: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dataPagamento: Date;
}