import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      // 'Content-Type': 'application/json',
      // // 'Access-Control-Allow-Origin':'*',
      Accept: 'application/json',
      
    };
    
    const token = this.jwtService.getToken();
    
    if (token) {
      headersConfig.authorization = `${token}`; //thiếu Token
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
