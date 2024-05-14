import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { breedActions } from "../../state/breeds/breed.actions";
import { Breed } from "../../state/breeds/breed.model";

@Component({
  selector: 'add-breed-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <form
        [formGroup]="breedForm"
        (ngSubmit)="onSubmit()"
        class="needs-validation"
        novalidate
      >
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            class="form-control"
            required
          />
          <div
            *ngIf="
              breedForm.controls.name.invalid &&
              (breedForm.controls.name.dirty || breedForm.controls.name.touched)
            "
            class="invalid-feedback"
          >
            Name is required.
          </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            formControlName="description"
            class="form-control"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="size" class="form-label">Size</label>
          <input
            id="size"
            type="text"
            formControlName="size"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="origin" class="form-label">Origin</label>
          <input
            id="origin"
            type="text"
            formControlName="origin"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="lifeExpectancy" class="form-label">Life Expectancy</label>
          <input
            id="lifeExpectancy"
            type="text"
            formControlName="lifeExpectancy"
            class="form-control"
          />
          <div
            *ngIf="
              breedForm.controls.lifeExpectancy.invalid &&
              (breedForm.controls.lifeExpectancy.dirty ||
                breedForm.controls.lifeExpectancy.touched)
            "
            class="invalid-feedback"
          >
            Life Expectancy is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Temperament</label>
          <div formArrayName="temperament">
            <div
              *ngFor="
                let temperament of temperamentArray.controls;
                let i = index
              "
              class="input-group mb-2"
            >
              <input type="text" [formControlName]="i" class="form-control" />
              <button
                type="button"
                class="btn btn-danger"
                (click)="removeTemperament(i)"
              >
                Remove
              </button>
              <div
                *ngIf="
                  temperament.invalid &&
                  (temperament.dirty || temperament.touched)
                "
                class="invalid-feedback d-block"
              >
                Temperament is required.
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-secondary"
            (click)="addTemperament()"
          >
            Add Temperament
          </button>
        </div>
        <div class="text-center">
          <a [routerLink]="['/']" class="btn btn-secondary px-3 py-2 mx-2">Cancel</a>
          <button
            type="submit"
            class="btn btn-primary text-white px-3 py-2 mx-2"
            [disabled]="breedForm.invalid"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AddBreedFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  public breedForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    size: [''],
    origin: [''],
    lifeExpectancy: [''],
    temperament: this.fb.array([this.fb.control('')]),
  });

  get temperamentArray() {
    return this.breedForm.get('temperament') as FormArray;
  }

  addTemperament() {
    this.temperamentArray.push(this.fb.control(''));
  }

  removeTemperament(index: number) {
    this.temperamentArray.removeAt(index);
  }

  onSubmit() {
    if (this.breedForm.valid) {
      this.store.dispatch(
        breedActions.addBreed({
          breed: this.breedForm.value as Breed,
        })
      );
    }
  }
}