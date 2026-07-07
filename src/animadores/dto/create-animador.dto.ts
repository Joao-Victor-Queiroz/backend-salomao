import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsNotEmpty, IsDate } from 'class-validator';
import { Cargo } from 'src/generated/prisma/enums';
import { Type } from 'class-transformer';

export class CreateAnimadorDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nomeAnimador: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Cargo, example: Cargo.ANIMADOR })
  @IsEnum(Cargo)
  @IsNotEmpty()
  cargo: Cargo;

  @ApiProperty({ example: '1995-08-25', description: 'Data de nascimento no formato YYYY-MM-DD' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataNascimento: Date;
}
