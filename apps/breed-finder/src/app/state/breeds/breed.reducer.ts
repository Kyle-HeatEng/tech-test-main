import { createFeature, createReducer, on } from '@ngrx/store';
import { breedActions } from './breed.actions';
import { BreedState, LoadStatus } from './breed.model';

export const initialState: BreedState = {
  breedList: [],
  breedDetails: {
    success: null,
    details: null
  },
  addBreed: {
    loadStatus: 'not loaded',
    success: null,
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
    on(breedActions.addBreed, (state) => ({
      ...state,
      addBreed: {
        loadStatus: 'loading' as LoadStatus,
        success: null
      }
    })),
    on(breedActions.addBreedSuccess, (state, {breeds}) => ({
      ...state,
      breedList: breeds,
      addBreed: {
        loadStatus: 'loaded' as LoadStatus,
        success: true
      }
    })),
    on(breedActions.resetAddBreed, (state) => ({
      ...state,
      addBreed: initialState.addBreed
    })),    
  )
});
