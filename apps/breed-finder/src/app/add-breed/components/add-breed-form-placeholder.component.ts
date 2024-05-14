import { Component } from '@angular/core';

@Component({
  selector: 'add-breed-form-placeholder',
  standalone: true,
  template: `
    <div class="container mt-5">
      <form class="needs-validation" novalidate>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <div class="placeholder-glow">
            <span class="placeholder col-12"></span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <div class="placeholder-glow">
            <span class="placeholder col-12"></span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Size</label>
          <div class="placeholder-glow">
            <span class="placeholder col-12"></span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Origin</label>
          <div class="placeholder-glow">
            <span class="placeholder col-12"></span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Life Expectancy</label>
          <div class="placeholder-glow">
            <span class="placeholder col-12"></span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Temperament</label>
          <div class="placeholder-glow">
            <span class="placeholder col-12 mb-2"></span>
            <span class="placeholder col-12 mb-2"></span>
            <span class="placeholder col-12"></span>
          </div>
        </div>
        <div class="placeholder-glow">
          <span class="placeholder col-12"></span>
        </div>
      </form>
    </div>
  `,
})
export class AddBreedFormPlaceholderComponent {}
