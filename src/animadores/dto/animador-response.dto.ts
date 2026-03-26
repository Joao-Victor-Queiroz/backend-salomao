import { ApiProperty } from '@nestjs/swagger';
import { Cargo } from 'src/generated/prisma/enums';

export class AnimadorResponseDto {
  @ApiProperty({ example: 'uuid-123-456' })
  id: string;

  @ApiProperty({ example: 'João Silva' })
  nomeAnimador: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @ApiProperty({ nullable: true })
  grupoAnimadorId: string | null;

  @ApiProperty({ nullable: true })
  grupoCrismandoId: string | null;

  @ApiProperty({ enum: Cargo, example: Cargo.ANIMADOR })
  cargo: Cargo;
}
