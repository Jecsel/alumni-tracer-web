import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthCookieService {
  private alumniTokenCookie = 'x-alumni-token';

  constructor(private cookieService: CookieService) { }

  getToken(token_name: string): string | undefined {
    return this.cookieService.get(token_name);
  }

  setToken(token_name: string, token: string): void {
    this.cookieService.set(token_name, token, null, '/', null, true, 'Lax');
  }

  removeToken(): void {
    this.cookieService.delete(this.alumniTokenCookie, '/', null, true);
  }
}
