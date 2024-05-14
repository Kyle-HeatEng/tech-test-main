import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Breed } from './breed.model';

export const breedActions = createActionGroup({
  source: '[Breed]',
  events: {
    'Get Breed List': emptyProps(),
    'Get Breed List Success': props<{ breeds: string[] }>(),
    'Get Breed List Failure': props<{ error: Error }>(),
    'Get Breed Details': props<{ breed: string }>(),
    'Get Breed Details Success': props<{ breed: Breed; success: boolean }>(),
    'Get Breed Details Failure': props<{ error: Error }>(),
    'Add Breed': props<{ breed: Breed }>(),
    'Reset Add Breed': emptyProps(),
    'Add Breed Success': props<{ breeds: string[] }>(),
    'Add Breed Failure': props<{ error: Error }>(),
  },
});