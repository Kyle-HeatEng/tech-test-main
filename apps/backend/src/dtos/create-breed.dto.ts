import {
    IsArray,
    IsOptional,
    IsString,
    IsUrl,
    Length
} from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  origin: string;

  @IsString()
  @IsOptional()
  lifeExpectancy?: string;

  @IsArray()
  @IsString({ each: true })
  temperament: string[];

  @IsUrl()
  @IsOptional()
  image?: string;
}
