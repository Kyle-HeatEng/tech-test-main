import { Controller, Get, Param } from '@nestjs/common';

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
    }
  }

  @Get(':breed')
  getBreedDetails(@Param('breed') breed: string): ApiResponse<Breed> {
    return {
      data: [this.breedService.getBreedDetails(breed)],
      success: true,
    }
  }
}
