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

const PHONE_REGEX = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const PHONE_MESSAGE = 'O telefone deve estar no formato (XX) XXXXX-XXXX';

export class CreateCrismandoDto {
  @IsNotEmpty()
  @IsString()
  nomeCrismando: string;

  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'O CPF deve estar no formato 000.000.000-00',
  })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  idade: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataNascimento: Date;

  @IsNotEmpty()
  @IsString()
  cidadeNascimento: string;

  @IsNotEmpty()
  @IsString()
  estadoNascimento: string;

  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsNotEmpty()
  @IsString()
  numEndereco: string;

  @IsOptional()
  @IsString()
  complemento: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

  @IsNotEmpty()
  @Matches(PHONE_REGEX, {
    message: PHONE_MESSAGE,
  })
  @IsString()
  telefoneCrismando: string;

  @IsNotEmpty()
  nomePai: string;

  @IsNotEmpty()
  nomeMae: string;

  @IsOptional()
  @Matches(PHONE_REGEX, {
    message: PHONE_MESSAGE,
  })
  @IsString()
  telefonePai: string;

  @IsOptional()
  @Matches(PHONE_REGEX, {
    message: PHONE_MESSAGE,
  })
  @IsString()
  telefoneMae: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Sim', 'Não'], { message: 'O valor deve ser "Sim" ou "Não"' })
  batizado: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Sim', 'Não'], { message: 'O valor deve ser "Sim" ou "Não"' })
  primeiraEucaristia: string;

  @IsNotEmpty()
  @IsString()
  justificativa: string;
}
