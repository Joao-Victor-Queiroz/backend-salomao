import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Cargo } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

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

  @ApiProperty({ example: 'uuid-animador-123', required: false, nullable: true })
  @IsOptional()
  @IsString()
  animadorId?: string;
}
