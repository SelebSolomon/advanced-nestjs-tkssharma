import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  categories?: string[];
}

export default PostDto;
