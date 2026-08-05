import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AssociarAnimadorDto {
  @ApiProperty({
    example: 'uuid-do-animador-123',
    description: 'ID do animador a ser associado ao usuário. Passe null ou omita para desassociar.',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'O ID do animador deve ser uma string.' })
  animadorId?: string | null;
}
