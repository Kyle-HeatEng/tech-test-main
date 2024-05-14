import { createFeature, createReducer, on } from '@ngrx/store';
import { breedActions } from './breed.actions';
import { BreedState } from './breed.model';

export const initialState: BreedState = {
  breedList: [],
  breedDetails: {
    success: null,
    details: null
  }
};

export const breedReducer = createFeature({
  name: 'breedState',
  reducer: createReducer(
    initialState,
    on(breedActions.getBreedListSuccess, (state, {breeds}) => {
      return {
        ...state,
        breedList: breeds
      }
    }),
    on(breedActions.getBreedDetailsSuccess, (state, {breed, success}) => {
      return {
        ...state,
        breedDetails: {
          success,
          details: breed
        }
      }
    }),
    on(breedActions.getBreedListFailure, (state, {error}) => ({
      ...state,
      breedDetails: {
        success: false,
        details: null
      }
    })),
  )
});
