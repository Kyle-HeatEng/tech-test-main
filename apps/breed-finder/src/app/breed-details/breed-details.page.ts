import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { breedActions } from '../state/breeds/breed.actions';
import { Breed } from '../state/breeds/breed.model';
import { breedReducer } from '../state/breeds/breed.reducer';
import { BreedCardErrorComponent } from './components/breed-card-error.component';
import { BreedCardPlaceholderComponent } from './components/breed-card-placeholder.component';
import { BreedCardComponent } from './components/breed-card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    RouterModule,
    BreedCardComponent,
    BreedCardErrorComponent,
    BreedCardPlaceholderComponent,
  ],
  selector: 'breed-details',
  template: `
    <div class="container pt-3">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
        @if(detailsResponse$ | async; as response) {
          @if(response.success === null) {
          <breed-card-placeholder />
          } 
          @else if (response.success) {
          <breed-card [details]="response.details" />
          } 
          @else {
          <breed-card-error />
          }
          <div class="text-center p-3">
            <a [routerLink]="['/']" class="btn btn-secondary px-3 py-2">Explore more breeds</a>
          </div>
        } 
        </div>
      </div>
    </div>
  `,
})
export class BreedDetailsPageComponent {
  private store = inject(Store);
  private router = inject(Router);

  detailsResponse$: Observable<{ details: Breed | null; success: boolean | null }> =
    this.store.select(breedReducer.selectBreedDetails);

  ngOnDestroy() {
    this.store.dispatch(breedActions.resetGetBreedDetails());
  }
}
