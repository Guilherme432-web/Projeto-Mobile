import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private baseUrl = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api';

  constructor(private http: HttpClient) {}

  getAllHeroes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all.json`);
  }

  getHero(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/id/${id}.json`);
  }
}