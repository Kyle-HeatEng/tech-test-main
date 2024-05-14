import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed } from './breed.model';

export type ApiResponse<T> = {
  data: T[];
  success: boolean;
  message?: string;
};

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  private http = inject(HttpClient)

  public getBreedList(): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>('http://localhost:3000/api/breed')
  }

  public getBreedDetails(breed: string): Observable<ApiResponse<Breed>> {
    return this.http.get<ApiResponse<Breed>>(`http://localhost:3000/api/breed/${breed}`)
  }

}
