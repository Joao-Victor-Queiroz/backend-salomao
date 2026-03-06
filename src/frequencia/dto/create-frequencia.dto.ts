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

export class FrequenciaItemDTO {
  @IsString()
  crismandoId: string;

  @IsEnum(StatusFrequencia)
  status: StatusFrequencia;

  @IsString()
  @IsOptional()
  justificativa?: string | null;
}

export class CreateFrequenciaDto {
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataFrequencia: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FrequenciaItemDTO)
  frequencias: FrequenciaItemDTO[];
}
