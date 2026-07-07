import { ApiProperty } from '@nestjs/swagger';
import { Cargo } from 'src/generated/prisma/enums';

class SignInUserResponseDto {
  @ApiProperty({ example: 'uuid-123-456' })
  id: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ enum: Cargo, example: Cargo.ANIMADOR })
  cargo: Cargo;

  @ApiProperty({ nullable: true, example: 'grupo-uuid-123' })
  grupoAnimadorId: string | null;

  @ApiProperty({ nullable: true, example: 'grupo-uuid-456' })
  grupoCrismandoId: string | null;
}

export class SignInResponseDto {
  @ApiProperty({ example: 'jwt-access-token-string' })
  accessToken: string;

  @ApiProperty({ example: 'uuid-refresh-token-string' })
  refreshToken: string;

  @ApiProperty({ type: SignInUserResponseDto })
  user: SignInUserResponseDto;
}
