import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({ title: 'User name', description: 'User name', required: true })
  username: string;

  @IsString()
  @ApiProperty({ title: 'Password', description: 'Password', required: true })
  password: string;
}
