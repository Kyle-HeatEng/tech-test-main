import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { breedReducer } from "../state/breeds/breed.reducer";
import { AddBreedFormPlaceholderComponent } from "./components/add-breed-form-placeholder.component";
import { AddBreedFormComponent } from "./components/add-breed-form.component";

@Component({
  selector: 'add-breed',
  standalone: true,
  imports: [AsyncPipe, AddBreedFormComponent, AddBreedFormPlaceholderComponent],
  template: `
    @if(addBreed$ | async; as addBreed) {
    <div class="container pt-3">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card">
            <div class="card-header bg-primary text-center">
              <h2 class="text-white">Add Breed</h2>
            </div>
            <div class="card-body">
              @if(addBreed.loadStatus !== 'loading') {
              <add-breed-form />
              } @else {
              <add-breed-form-placeholder />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  `,
})
export class AddBreedPage {
  private store = inject(Store);
  private router = inject(Router);

  public addBreed$ = this.store.select(breedReducer.selectAddBreed).pipe(
    tap(({ success }) => {
      if (success) {
        this.router.navigate(['/']);
      }
    })
  );
}