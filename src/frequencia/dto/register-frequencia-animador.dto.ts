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

export class FrequenciaAnimadorItemDto {
  @IsString()
  animadorId: string;

  @IsEnum(DescricaoFrequenciaAnimador)
  tipo: DescricaoFrequenciaAnimador;

  @IsEnum(StatusFrequencia)
  status: StatusFrequencia;

  @IsOptional()
  @IsString()
  justificativa: string | null;
}

export class CreateAnimadorFrequenciaDto {
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataFrequencia: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FrequenciaAnimadorItemDto)
  frequencias: FrequenciaAnimadorItemDto[];
}
