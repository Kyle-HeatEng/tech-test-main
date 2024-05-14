import { Component } from '@angular/core';

@Component({
  selector: 'breed-card-error',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-primary text-center">No breed selected</h2>
      </div>
    </div>
  `,
})
export class BreedCardErrorComponent {}
