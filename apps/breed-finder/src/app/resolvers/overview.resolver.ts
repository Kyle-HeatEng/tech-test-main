import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { breedActions } from '../state/breeds/breed.actions';

export const breedListResolver = () => {
  const store = inject(Store);

  // Use a resolver to fetch the breed data before the component is rendered.
  // This pre-fetching improves SEO and keeps the component separate from the NGRX store.
  store.dispatch(breedActions.getBreedList());

  return;
};
