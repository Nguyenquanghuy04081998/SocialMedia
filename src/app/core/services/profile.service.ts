import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private apiService: ApiService) {}
  getProfile(name) {
    return this.apiService.get(`/profiles/${name}`);
  }

  follow(name) {
    return this.apiService.post(`/profiles/${name}/follow`);
  }

  unfollow(name) {
    return this.apiService.delete(`/profiles/${name}/follow`);
  }
}
