import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BreedService } from './breed.service';

describe('CapacitorListenersService', () => {
  let service: BreedService;
  let httpClient: HttpClient;

  const mockBreedList = ['Pomeranian', 'Poodle']
  const mockBreedDetails = {
    name: 'Labrador Retriever',
    description:
      'Labrador Retrievers are friendly, outgoing, and high-spirited companions who have more than enough affection to go around for a family looking for a medium-to-large dog.',
    size: 'Medium to Large',
    origin: 'Canada, United Kingdom',
    lifeExpectancy: '10-12 years',
    temperament: ['Friendly', 'Outgoing', 'Gentle', 'Intelligent'],
    image:
      'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-07/Labrador-Retriever.jpg?itok=BrVXkZic',
  };
  
  const mockNewBreed = {
    name: 'Beagle',
    description: 'Beagles are friendly and curious.',
    size: 'Small to Medium',
    origin: 'United Kingdom',
    lifeExpectancy: '12-15 years',
    temperament: ['Friendly', 'Curious', 'Merry'],
    image: 'https://example.com/beagle.jpg',
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn().mockImplementation((url: string) => {
              if (url === 'http://localhost:3000/api/breed') {
                return of({ success: true, data: mockBreedList });
              }
              if (
                url === 'http://localhost:3000/api/breed/Labrador%20Retriever'
              ) {
                return of({ success: true, data: [mockBreedDetails] });
              }
              return of({ success: false, data: [] });
            }),
            post: jest.fn().mockImplementation((url: string, body: any) => {
              if (url === 'http://localhost:3000/api/breed') {
                return of({ success: true, data: [...mockBreedList, body.name] });
              }
              return of({ success: false, data: [] });
            }),
          },
        },
      ],
    });

    service = TestBed.inject(BreedService);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreedList', () => {
    it('should call http get', () => {
      service.getBreedList().subscribe((response) => {
        expect(response.data).toEqual(mockBreedList);
        expect(response.success).toEqual(true);
      });
      expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/api/breed')
    })
  })

  describe('getBreedDetails', () => {
    it('should call http get and return breed details', () => {
      const breed = 'Labrador%20Retriever';
      service.getBreedDetails(breed).subscribe((response) => {
        expect(response.data).toEqual(mockBreedDetails);
        expect(response.success).toEqual(true);
      });
      expect(httpClient.get).toHaveBeenCalledWith(
        `http://localhost:3000/api/breed/${breed}`
      );
    });

    it('should call http get and return empty data', () => {
      const breed = 'Pomeranian';
      service.getBreedDetails(breed).subscribe((response) => {
        expect(response.data).toEqual([]);
        expect(response.success).toEqual(false);
      });
      expect(httpClient.get).toHaveBeenCalledWith(
        `http://localhost:3000/api/breed/${breed}`
      );
    });
  });

   describe('addBreed', () => {
     it('should call http post and add a new breed', () => {
       service.addBreed(mockNewBreed).subscribe((response) => {
         expect(response.data).toEqual([...mockBreedList, mockNewBreed.name]);
         expect(response.success).toEqual(true);
       });
       expect(httpClient.post).toHaveBeenCalledWith(
         'http://localhost:3000/api/breed',
         mockNewBreed
       );
     });

     it('should call http post and fail to add a new breed', () => {
       const invalidBreed = { ...mockNewBreed, name: '' };
       service.addBreed(invalidBreed).subscribe((response) => {
         expect(response.data).toEqual([]);
         expect(response.success).toEqual(false);
       });
       expect(httpClient.post).toHaveBeenCalledWith(
         'http://localhost:3000/api/breed',
         invalidBreed
       );
     });
   });

});
