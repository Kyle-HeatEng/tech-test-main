import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type ApiResponse<T> = {
  data: T[];
  success: boolean;
  message?: string;
};

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  constructor(private http: HttpClient) {}

  public getBreedList(): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>('http://localhost:3000/api/breed')
  }
}
