import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'breed-card-placeholder',
  template: `
    <div class="card">
      <div class="card-header text-center">
        <div class="placeholder-glow">
          <div
            class="placeholder card-img-top rounded"
            style="width: 200px; height: 200px;"
          ></div>
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h2>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-4"></span>
        </p>
        <ul class="list-group list-group-flush">
          <li class="list-group-item placeholder-glow">
            <span class="placeholder col-6"></span>
          </li>
          <li class="list-group-item placeholder-glow">
            <span class="placeholder col-5"></span>
          </li>
          <li class="list-group-item placeholder-glow">
            <span class="placeholder col-7"></span>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class BreedCardPlaceholderComponent {}
