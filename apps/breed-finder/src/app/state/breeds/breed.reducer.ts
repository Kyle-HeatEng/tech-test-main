import { createFeature, createReducer, on } from '@ngrx/store';
import { breedActions } from './breed.actions';
import { BreedState } from './breed.model';

export const initialState: BreedState = {
  breedList: []
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
    })
  )
});
