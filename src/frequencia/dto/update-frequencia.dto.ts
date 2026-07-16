import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusFrequencia } from 'src/generated/prisma/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFrequenciaDto {
  @ApiPropertyOptional({ enum: StatusFrequencia, example: StatusFrequencia.P, description: 'Status da frequência (P, FNJ, FJ)' })
  @IsEnum(StatusFrequencia)
  @IsOptional()
  status?: StatusFrequencia;

  @ApiPropertyOptional({ example: 'Motivo médico', required: false, nullable: true, description: 'Justificativa para falta' })
  @IsString()
  @IsOptional()
  justificativa?: string | null;
}
