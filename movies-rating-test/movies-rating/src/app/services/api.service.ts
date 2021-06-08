import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private readonly API_URL = 'https://api.nytimes.com/svc/movies/v2/';
  private readonly API_KEY = '7T2J8FUfEAJdZxfx7EZZMFfMLQ98SRA9'
  post(endpoint: string, body: any): Observable<any> {
    endpoint = this.appendApiKey(endpoint);
    return this.http.post(`${this.API_URL + endpoint}`, body);
  }

  get(endpoint: string): Observable<any> {
    endpoint = this.appendApiKey(endpoint);
    return this.http.get(`${this.API_URL + endpoint}`);
  }

  delete(endpoint: string): Observable<any> {
    endpoint = this.appendApiKey(endpoint);
    return this.http.delete(`${this.API_URL + endpoint}`);
  }

  put(endpoint: string, body: any): Observable<any> {
    endpoint = this.appendApiKey(endpoint);
    return this.http.put(`${this.API_URL + endpoint}`, body);
  }

  appendApiKey(endpoint: string) {
    if (endpoint.includes('?')) {
      return `${endpoint}&api-key=${this.API_KEY}`;
    }
    return `${endpoint}?api-key=${this.API_KEY}`;
  }

}
