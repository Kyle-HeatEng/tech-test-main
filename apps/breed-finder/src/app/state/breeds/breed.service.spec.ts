import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BreedService } from './breed.service';

describe('CapacitorListenersService', () => {
  let service: BreedService;
  let httpClient: HttpClient;

  const mockBreedList = ['Pomeranian', 'Poodle']

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn().mockReturnValue(of({success: true, data: mockBreedList}))
          }
        }
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
});
