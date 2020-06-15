import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  slug;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  getArticle(slug): Observable<any> {
    return this.apiService.get('/articles/', slug);
  }
  saveArticle(obj, slug): Observable<any> {
    if (slug) {
      return this.apiService.put(`/articles/${slug}`, obj);
    } else {
      return this.apiService.post('/articles', obj);
    }
  }

  deleteArticle(slug): Observable<any> {
    return this.apiService.delete(`/articles/${slug}`);
  }

  // favorite(rate, slug): Observable<any> {
  //   return this.apiService.post(`/articles/${slug}/${rate}/favorite`);
  // }

  // unfavorite(slug): Observable<any> {
  //   return this.apiService.delete(`/articles/${slug}/favorite`);
  // }
}
