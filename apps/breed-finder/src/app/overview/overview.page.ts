import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { breedReducer } from '../state/breeds/breed.reducer';

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPageComponent {
  private store = inject(Store);
  
  breedList$: Observable<string[]> = this.store.select(breedReducer.selectBreedList);

}
