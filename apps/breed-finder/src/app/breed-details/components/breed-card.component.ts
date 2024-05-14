import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { Breed } from "../../state/breeds/breed.model";
import { BreedCardErrorComponent } from "./breed-card-error.component";

@Component({
  standalone: true,
  imports: [CommonModule, BreedCardErrorComponent],
  selector: 'breed-card',
  template: `
    @if(!!details()) {
    <div class="card">
      <div class="card-header text-center">
        <img
          [src]="details()!.image"
          alt="{{ details()!.name }}"
          class="card-img-top rounded"
        />
      </div>
      <div class="card-body">
        <h2 class="card-title text-primary text-center">
          {{ details()!.name }}
        </h2>
        <p class="card-text">
          <strong class="text-secondary">Description:</strong>
          {{ details()!.description }}
        </p>
        <p class="card-text">
          <strong class="text-secondary">Size:</strong>
          {{ details()!.size }}
        </p>
        <p class="card-text">
          <strong class="text-secondary">Origin:</strong>
          {{ details()!.origin }}
        </p>
        <p class="card-text">
          <strong class="text-secondary">Life Expectancy:</strong>
          {{ details()!.lifeExpectancy }}
        </p>
        <p class="card-text">
          <strong class="text-secondary">Temperament:</strong>
        </p>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            *ngFor="let trait of details()!.temperament"
          >
            {{ trait }}
          </li>
        </ul>
      </div>
    </div>
    } @else {
    <breed-card-error />
    }
  `,
})
export class BreedCardComponent {
  details = input.required<Breed | null>();
}