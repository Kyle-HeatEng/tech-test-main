import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import breedList from '../assets/breed-list.json';
import { Breed } from './breed.model';

const breedInfos: Breed[] = JSON.parse(JSON.stringify(breedList));

@Injectable()
export class BreedService {
  getAllBreeds(): string[] {
    return breedInfos.map((breedInfo) => breedInfo.name);
  }

  getBreedDetails(breedName: string): Breed {
    const breedInfo = breedInfos.find(
      (breedInfo) => breedInfo.name === breedName
    );

    if (!breedInfo) {
      throw new NotFoundException({
        success: false,
        message: 'Breed not found',
      });
    }

    return breedInfo;
  }

  createBreed(breed: Breed): string[] {
    const hasBreed = breedInfos.some( 
      (breedInfo) => breedInfo.name === breed.name 
    );
    
    if(hasBreed) {
      throw new ConflictException({
        success: false,
        message: 'Breed already exists',
      });
    }

    breedInfos.push(breed);
    
    return this.getAllBreeds();
  }
}
