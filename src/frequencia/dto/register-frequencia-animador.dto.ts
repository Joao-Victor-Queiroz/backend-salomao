import {
  IsDate,
  IsArray,
  IsString,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  StatusFrequencia,
  DescricaoFrequenciaAnimador,
} from 'src/generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class FrequenciaAnimadorItemDto {
  @ApiProperty({ example: 'a1b07384-b113-4ec5-c5e2-9e8c45963212', description: 'ID do animador' })
  @IsString()
  animadorId: string;

  @ApiProperty({ enum: DescricaoFrequenciaAnimador, example: DescricaoFrequenciaAnimador.ENCONTRO, description: 'Tipo do encontro do animador (FORMACAO, ENCONTRO)' })
  @IsEnum(DescricaoFrequenciaAnimador)
  tipo: DescricaoFrequenciaAnimador;

  @ApiProperty({ enum: StatusFrequencia, example: StatusFrequencia.P, description: 'Status da frequência (P, FNJ, FJ)' })
  @IsEnum(StatusFrequencia)
  status: StatusFrequencia;

  @ApiProperty({ example: 'Motivo médico', required: false, nullable: true, description: 'Justificativa para falta' })
  @IsOptional()
  @IsString()
  justificativa: string | null;
}

export class CreateAnimadorFrequenciaDto {
  @ApiProperty({ example: '2026-07-09', description: 'Data da frequência no formato YYYY-MM-DD' })
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataFrequencia: Date;

  @ApiProperty({ type: [FrequenciaAnimadorItemDto], description: 'Lista de frequências dos animadores' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FrequenciaAnimadorItemDto)
  frequencias: FrequenciaAnimadorItemDto[];
}
