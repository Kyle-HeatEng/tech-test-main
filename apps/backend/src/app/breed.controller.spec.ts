import { Test } from '@nestjs/testing';

import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from '../dtos/create-breed.dto';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';

describe('AppController', () => {
  let breedController: BreedController;
  let breedService: BreedService;

  const mockBreedList = [
    'Pomeranian', 'Labrador'
  ]

  const mockBreedDetails = {
    name: 'Labrador',
    lifeSpan: '10-12 years',
    temperament: 'Kind, outgoing, agile, trusting, even tempered',
    breedGroup: 'Sporting',
    height: '21.5-24.5 inches',
    weight: '55-80 lbs',
    image: 'https://cdn2.thedogapi.com/images/B1SV7gqE7_400x400.jpg'
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [BreedController],
      providers: [
        {
          provide: BreedService,
          useValue: {
            getAllBreeds: jest.fn().mockReturnValue(mockBreedList),
            getBreedDetails: jest
              .fn()
              .mockImplementation((breedName: string) => {
                const isBreed = mockBreedList.includes(breedName);
                if (!isBreed) {
                  throw new NotFoundException({
                    success: false,
                    message: 'Breed not found',
                  });
                }
                return mockBreedDetails;
              }),
            createBreed: jest
              .fn()
              .mockImplementation((breed: CreateBreedDto) => {
                const hasBreed = mockBreedList.includes(breed.name);
                if (hasBreed) {
                  throw new ConflictException({
                    success: false,
                    message: 'Breed already exists',
                  });
                }
                mockBreedList.push(breed.name);
                return mockBreedList;
              }),
          },
        },
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
  
  describe('getBreedDetails', () => {
    it('should return details of a valid breed', () => {
      const breedDetailsResponse = breedController.getBreedDetails('Labrador');
      expect(breedDetailsResponse.data).toEqual([mockBreedDetails]);
      expect(breedDetailsResponse.success).toEqual(true);
      expect(breedService.getBreedDetails).toHaveBeenCalledWith('Labrador');
    });

    it('should throw an error if the breed is not found', () => {
      expect(() => breedController.getBreedDetails('Husky')).toThrow(
        NotFoundException
      );
      expect(breedService.getBreedDetails).toHaveBeenCalledWith('Husky');
    });
  });

   describe('createBreed', () => {
     it('should create a new breed', () => {
       const newBreed: CreateBreedDto = {
         name: 'Beagle',
         description: 'Small hound dog',
         size: 'Medium',
         origin: 'England',
         lifeExpectancy: '12-15 years',
         temperament: ['Friendly', 'Curious'],
       };

       const breedResponse = breedController.createBreed(newBreed);
       expect(breedResponse.data).toEqual(mockBreedList);
       expect(breedResponse.success).toEqual(true);
       expect(breedService.createBreed).toHaveBeenCalledWith(newBreed as any);
     });

     it('should throw an error if the breed already exists', () => {
       const existingBreed: CreateBreedDto = {
         name: 'Labrador',
         description: 'Large hound dog',
         size: 'Large',
         origin: 'Canada',
         lifeExpectancy: '10-12 years',
         temperament: ['Kind', 'Outgoing'],
       };

       expect(() => breedController.createBreed(existingBreed)).toThrow(
         ConflictException
       );
       expect(breedService.createBreed).toHaveBeenCalledWith(
         existingBreed as any
       );
     });
   });
});
