import { IsString, IsEmail, IsEnum, IsNotEmpty, IsDate } from 'class-validator';
import { Cargo } from 'src/generated/prisma/enums';
import { Type } from 'class-transformer';

export class CreateAnimadorDto {
  @IsString()
  @IsNotEmpty()
  nomeAnimador: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Cargo)
  @IsNotEmpty()
  cargo: Cargo;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'A data deve estar no formato YYYY-MM-DD' })
  dataNascimento: Date;
}
