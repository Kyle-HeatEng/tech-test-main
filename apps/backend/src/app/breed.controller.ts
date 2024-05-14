import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateBreedDto } from '../dtos/create-breed.dto';
import { ApiResponse, Breed } from './breed.model';
import { BreedService } from './breed.service';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  getBreeds(): ApiResponse<string> {
    return {
      data: this.breedService.getAllBreeds(),
      success: true,
    };
  }

  @Get(':breed')
  getBreedDetails(@Param('breed') breed: string): ApiResponse<Breed> {
    return {
      data: [this.breedService.getBreedDetails(breed)],
      success: true,
    };
  }

  @Post()
  createBreed(@Body() breed: CreateBreedDto): ApiResponse<string> {
    return {
      data: this.breedService.createBreed(breed as Breed),
      success: true,
    };
  }
}
