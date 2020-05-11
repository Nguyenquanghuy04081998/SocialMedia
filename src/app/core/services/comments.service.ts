import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  // slug: string;
  constructor(private apiService: ApiService) {}

  getComment(slug) {
    return this.apiService.get(`/articles/${slug}/comments`);
  }
  postComment(slug, obj) {
    return this.apiService.post(`/articles/${slug}/comments`, obj);
  }
  deleteComment(id, slug) {
    return this.apiService.delete(`/articles/${slug}/comments/${id}`);
  }
}
