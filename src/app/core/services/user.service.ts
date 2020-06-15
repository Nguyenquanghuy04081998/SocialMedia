import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUserSubject = new BehaviorSubject<User>({} as User); // khi can gia tri khoi tao ban dau
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticatedSubject = new ReplaySubject<boolean>(1); // khi khong can gia tri khoi tao ban dau
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  setUser(user: User) {
    // console.log(user.token);
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  logOutUser() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  resovleAuth(type, dataUser): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    this.jwtService.savePassWord(dataUser.password);
    if (type == 'login') {
      delete dataUser.username;
    }
    return this.apiService.post('/users' + route, { user: dataUser }).pipe(
      map(data => {
        this.setUser(data.user);
        return data;
      })
    );
  }

  getCurrentUser() {
    return this.apiService.get('/users');
  }
}
