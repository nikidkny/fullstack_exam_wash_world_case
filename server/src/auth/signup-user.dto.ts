import { ApiProperty } from '@nestjs/swagger';

export class SignupSwaggerDto {
  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'john@email.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: 12345678 })
  phone_number: number;

  @ApiProperty({ example: 'A3DF44DD' })
  plate_number: string;

  @ApiProperty({ example: 3 })
  membership_plan_id: number;
}