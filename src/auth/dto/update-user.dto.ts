import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { Cargo } from 'src/generated/prisma/enums';

export class UpdateUserDto {
  @ApiProperty({ example: 'João Silva', required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ example: 'joao@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'novaSenha123', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password?: string;

  @ApiProperty({ enum: Cargo, example: Cargo.ANIMADOR, required: false })
  @IsOptional()
  @IsEnum(Cargo)
  cargo?: Cargo;

  @ApiProperty({ example: 'uuid-animador-123', required: false, nullable: true })
  @IsOptional()
  @IsString()
  animadorId?: string | null;
}
