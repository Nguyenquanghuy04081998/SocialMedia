import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private apiService: ApiService) {}
  getTag() {
    return this.apiService.get(`/tags`);
  }
}
