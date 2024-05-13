import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { breedActions } from './breed.actions';
import { BreedService } from './breed.service';

@Injectable()
export class BreedEffects {
  constructor(
    private actions$: Actions,
    private breedService: BreedService,
  ) {}

  getBreedList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(breedActions.getBreedList),
      concatMap(() => {
          return this.breedService.getBreedList().pipe(
            map((res) =>
              {
                const { data, success, message } = res;
                if(!success) {
                  breedActions.getBreedListFailure({ error: new Error(message) })
                }
                return breedActions.getBreedListSuccess({ breeds: data })},
            ),
            catchError((e) => of(breedActions.getBreedListFailure({ error: e }))),
          )
        }
      ),
    );
  });
}
