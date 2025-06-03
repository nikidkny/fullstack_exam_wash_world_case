import { ApiProperty } from '@nestjs/swagger';

export class LoginSwaggerDto {
  @ApiProperty({ example: 'john@email.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
