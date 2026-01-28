import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryDto {
  @ApiProperty({
    description: 'email',
    example: 'example@gmail.com',
    required: true,
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'query for ids',
    example: '1,2,3,4,5',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }: any) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsString({ each: true })
  ids: string[];
}

export class AddressDTO {
  @ApiProperty({
    description: 'your city',
    example: 'Jos',
    required: true,
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'state',
    example: 'Plateau',
    required: true,
  })
  @IsString()
  state: number;
}

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
  userName: string;

  @ApiProperty({
    description: 'address',
    example: { city: 'Jos', state: 'jos' },
    required: true,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;
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
