// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCookieService } from './auth-cookie-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: AuthCookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from the cookie service
    const token = this.cookieService.getToken('x-alumni-token');

    // If a token exists, add it to the request headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Continue with the modified request
    return next.handle(request);
  }
}
