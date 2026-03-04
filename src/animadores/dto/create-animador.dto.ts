import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Cargo } from 'src/generated/prisma/enums';

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
}
