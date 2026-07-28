import { ApiProperty } from '@nestjs/swagger';
import { Cargo } from 'src/generated/prisma/enums';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-123-456' })
  id: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @ApiProperty({ enum: Cargo, example: Cargo.ANIMADOR })
  cargo: Cargo;

  @ApiProperty({ nullable: true, example: 'uuid-animador-123' })
  animadorId: string | null;
}
