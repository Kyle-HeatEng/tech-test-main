import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { breedActions } from './breed.actions';
import { BreedEffects } from './breed.effects';
import { BreedService } from './breed.service';

describe('CourseProgressEffects', () => {
  let actions: Observable<unknown>;
  let effects: BreedEffects;
  let service: BreedService;
  let store: MockStore;

  const mockBreedList = ['Pomeranian', 'Poodle'];
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedEffects,
        provideMockStore(),
        provideMockActions(() => actions),
        {
          provide: BreedService,
          useValue: {
            getBreedList: jest.fn(),
            getBreedDetails: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(BreedService);
    effects = TestBed.inject(BreedEffects);
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getBreedList$', () => {
    describe('when the service returns successful', () => {
      it('should dispatch getBreedListSuccess', () => {
        actions = hot('-a', { a: breedActions.getBreedList() });

        const serviceResponse = cold('-a', {
          a: { success: true, data: mockBreedList },
        });
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', {
          a: breedActions.getBreedListSuccess({ breeds: mockBreedList }),
        });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });

    describe('when the service returns an error', () => {
      it('should dispatch getBreedListFailure', () => {
        const error = new Error('oops');

        actions = hot('-a', { a: breedActions.getBreedList() });

        const serviceResponse = cold('-#|', {}, error);
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: breedActions.getBreedListFailure({error}) });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });

    describe('getBreedDetails$', () => {
      describe('when the service returns successful', () => {
        it('should dispatch getBreedDetailsSuccess', () => {
          actions = hot('-a', { a: breedActions.getBreedDetails({ breed: 'Poodle' }) });

          const serviceResponse = cold('-a', {
            a: { success: true, data: [mockBreedDetails] },
          });
          service.getBreedDetails = jest.fn(() => serviceResponse);

          const expected = cold('--a', {
            a: breedActions.getBreedDetailsSuccess({ breed: mockBreedDetails, success: true }),
          });

          expect(effects.getBreedDetails$).toBeObservable(expected);
          expect(service.getBreedDetails).toHaveBeenCalled();
        });
      });

      describe('when the service returns an error', () => {
        it('should dispatch getBreedDetailsFailure', () => {
          const error = new Error('oops');

          actions = hot('-a', { a: breedActions.getBreedDetails({ breed: 'Poodle' }) });

          const serviceResponse = cold('-#|', {}, error);
          service.getBreedDetails = jest.fn(() => serviceResponse);

          const expected = cold('--a', { a: breedActions.getBreedDetailsFailure({error}) });

          expect(effects.getBreedDetails$).toBeObservable(expected);
          expect(service.getBreedDetails).toHaveBeenCalled();
        })
      });
    })
  });
});
