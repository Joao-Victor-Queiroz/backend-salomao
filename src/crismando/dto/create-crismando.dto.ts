import {
  IsNotEmpty,
  Matches,
  IsDate,
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const PHONE_REGEX = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const PHONE_MESSAGE = 'O telefone deve estar no formato (XX) XXXXX-XXXX';

export class CreateCrismandoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nomeCrismando: string;

  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'O CPF deve estar no formato 000.000.000-00',
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @ApiProperty()
  idade: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  @ApiProperty()
  dataNascimento: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cidadeNascimento: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  estadoNascimento: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  endereco: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  numEndereco: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  complemento: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cep: string;

  @IsNotEmpty()
  @Matches(PHONE_REGEX, {
    message: PHONE_MESSAGE,
  })
  @IsString()
  @ApiProperty()
  telefoneCrismando: string;

  @IsNotEmpty()
  @ApiProperty()
  nomePai: string;

  @IsNotEmpty()
  @ApiProperty()
  nomeMae: string;

  @IsOptional()
  @Matches(PHONE_REGEX, {
    message: PHONE_MESSAGE,
  })
  @IsString()
  @ApiPropertyOptional()
  telefonePai: string;

  @IsOptional()
  @Matches(PHONE_REGEX, {
    message: PHONE_MESSAGE,
  })
  @IsString()
  @ApiPropertyOptional()
  telefoneMae: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Sim', 'Não'], { message: 'O valor deve ser "Sim" ou "Não"' })
  @ApiProperty()
  batizado: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Sim', 'Não'], { message: 'O valor deve ser "Sim" ou "Não"' })
  @ApiProperty()
  primeiraEucaristia: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  justificativa: string;
}
