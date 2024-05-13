import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const breedActions = createActionGroup({
  source: '[Breed]',
  events: {
    'Get Breed List': emptyProps(),
    'Get Breed List Success': props<{ breeds: string[] }>(),
    'Get Breed List Failure': props<{ error: Error }>(),
  }
});