import { Route } from '@angular/router';
import { AddBreedPage } from './add-breed/add-breed.page';
import { BreedDetailsPageComponent } from './breed-details/breed-details.page';
import { OverviewPageComponent } from './overview/overview.page';
import { breedDetailsResolver } from './resolvers/breed-details.resolver';
import { breedListResolver } from './resolvers/overview.resolver';

export const appRoutes: Route[] = [
  { path: '', component: OverviewPageComponent, resolve: {breeds: breedListResolver}},
  {
    path: 'breed/:breed',
    component: BreedDetailsPageComponent,
    resolve: { breedDetails: breedDetailsResolver },
  },
  {
    path: 'breed',
    component: AddBreedPage
  }
];
