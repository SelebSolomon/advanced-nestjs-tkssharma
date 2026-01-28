import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'email',
    example: 'example@gmail.com',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'your name here',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  userName: number;
}

export class CreatedUserResponseDto {
  @ApiResponseProperty({
    example: '838877-74939-93948-74433',
    format: 'v4',
  })
  public id: string;

  @ApiResponseProperty({
    example: 'example@gmail.com',
  })
  public email: string;

  @ApiResponseProperty({
    example: 'John Doe',
  })
  public userName: string;
}
