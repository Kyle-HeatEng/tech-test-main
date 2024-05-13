import { Test } from '@nestjs/testing';

import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';

describe('AppController', () => {
  let breedController: BreedController;
  let breedService: BreedService;

  const mockBreedList = [
    'Pomeranian', 'Labrador'
  ]

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [BreedController],
      providers: [
        {
          provide: BreedService,
          useValue: {
            getAllBreeds: jest.fn().mockReturnValue(mockBreedList)
          }
        }
      ],
    }).compile();

    breedController = module.get<BreedController>(BreedController)
    breedService = module.get<BreedService>(BreedService)
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const breedResponse = breedController.getBreeds();
      expect(breedResponse.data).toEqual(mockBreedList);
      expect(breedResponse.success).toEqual(true);
      expect(breedService.getAllBreeds).toHaveBeenCalled();
    });
  });
});
