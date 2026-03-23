import { ApiProperty } from '@nestjs/swagger';
import { Frequencia } from '../../frequencia/entities/frequencia.entity';
import { Caixinha } from '../../caixinha/entities/caixinha.entity';
export class CrismandoEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nomeCrismando: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  idade: number;

  @ApiProperty()
  dataNascimento: Date;

  @ApiProperty()
  cidadeNascimento: string;

  @ApiProperty()
  estadoNascimento: string;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  numEndereco: string;

  @ApiProperty({ required: false, nullable: true })
  complemento: string | null;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  telefoneCrismando: string;

  @ApiProperty()
  nomePai: string;

  @ApiProperty()
  nomeMae: string;

  @ApiProperty({ required: false, nullable: true })
  telefonePai: string | null;

  @ApiProperty({ required: false, nullable: true })
  telefoneMae: string | null;

  @ApiProperty()
  batizado: string;

  @ApiProperty()
  primeiraEucaristia: string;

  @ApiProperty()
  justificativa: string | null;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  grupo: {
    nomeGrupo: string;
  };

  @ApiProperty({ type: () => Frequencia, isArray: true })
  frequencias: Frequencia[];

  @ApiProperty({ type: () => Caixinha, isArray: true })
  caixinhas: Caixinha[];

  grupoId: string | null;
}
