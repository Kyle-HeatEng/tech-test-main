import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { breedActions } from "../state/breeds/breed.actions";

export const breedDetailsResolver = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const breed = route.paramMap.get('breed');

  if (!breed) {
    return;
  }
  
  // Use a resolver to fetch the breed data before the component is rendered.
  // This pre-fetching improves SEO and keeps the component separate from the NGRX store.
  store.dispatch(breedActions.getBreedDetails({ breed }));

  return 
};

