import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  getToken(): string {    
    return localStorage.getItem('token');
  }

  getPassword(): string {
    return localStorage.getItem('password');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  savePassWord(password) {
    localStorage.setItem('password', password);
  }

  destroyToken() {
    localStorage.removeItem('token');
  }
}
