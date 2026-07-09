import {
  IsDate,
  IsArray,
  IsString,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusFrequencia } from 'src/generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class FrequenciaItemDTO {
  @ApiProperty({ example: 'a1b07384-b113-4ec5-c5e2-9e8c45963212', description: 'ID do crismando' })
  @IsString()
  crismandoId: string;

  @ApiProperty({ enum: StatusFrequencia, example: StatusFrequencia.P, description: 'Status da frequência (P, FNJ, FJ)' })
  @IsEnum(StatusFrequencia)
  status: StatusFrequencia;

  @ApiProperty({ example: 'Motivo médico', required: false, nullable: true, description: 'Justificativa para falta' })
  @IsString()
  @IsOptional()
  justificativa?: string | null;
}

export class CreateFrequenciaDto {
  @ApiProperty({ example: '2026-07-09', description: 'Data da frequência no formato YYYY-MM-DD' })
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataFrequencia: Date;

  @ApiProperty({ type: [FrequenciaItemDTO], description: 'Lista de frequências dos crismandos' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FrequenciaItemDTO)
  frequencias: FrequenciaItemDTO[];
}
