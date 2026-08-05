import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Cargo } from 'src/generated/prisma/enums';

export class CreateAnimadorDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nomeAnimador: string;

  @ApiProperty({ enum: Cargo, example: Cargo.ANIMADOR, required: false })
  @IsEnum(Cargo)
  @IsOptional()
  cargo?: Cargo;

  @ApiProperty({ example: '1995-08-25', description: 'Data de nascimento no formato YYYY-MM-DD' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataNascimento: Date;

  @ApiProperty({ example: 'uuid-do-usuario-123', description: 'ID do usuário existente para vincular a este animador (opcional)', required: false })
  @IsOptional()
  @IsString()
  usuarioId?: string;
}

