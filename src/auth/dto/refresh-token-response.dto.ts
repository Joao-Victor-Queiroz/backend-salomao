import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty({ example: 'jwt-access-token-string' })
  accessToken: string;

  @ApiProperty({ example: 'novo-uuid-refresh-token-string' })
  newRefreshToken: string;
}
