import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// const API = 'https://conduit.productionready.io/api';
const API = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  namePath: string;
  constructor(private http: HttpClient) {}

  get(
    path: string,
    author?: string,
    limit?: string,
    offset?: string,
    favorited?: string,
    tag?: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();
    if (author) {
      params = params.set('author', author);
    }
    if (tag) {
      params = params.set('tag', tag);
    }
    if (favorited) {
      params = params.set('favorited', favorited);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    if (offset) {
      params = params.set('offset', offset);
    }
    return this.http.get(`${API}${path}`, { params, headers });
  }

  post(path: string, data?: object, image?): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${API}${path}`, JSON.stringify(data), { headers });
  }
  postImage(path: string, data?: object): Observable<any> {
    console.log(data);
    return this.http.post(`${API}${path}`, data);
  }
  put(path: string, body: object = {}): Observable<any> {
    console.log(body);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${API}${path}`, JSON.stringify(body), {
      headers
    });
  }

  delete(path: string, token?): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${API}${path}`, token);
  }

  setUserName(name) {
    this.namePath = name;
  }
}
