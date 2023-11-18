import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Route, Router } from "@angular/router";
import { AuthCookieService } from "../auth/auth-cookie-service.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiUrl;
  token: string = localStorage.getItem("token")!;
  token_name: string = 'x-alumni-token';

  httpOptions = {
    headers: new HttpHeaders({
      Accept: "*/*",
      "Content-Type": "application/json",
      "x-tracer-token": this.getToken(),
      Authorization: `Bearer ${this.getToken()}`,
    }),
  };

  signUpHttpOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router, private cookieService: AuthCookieService) {}

  /* POST REQUEST */
  registerUser(data): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + "/user/register", data, this.signUpHttpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  createAlumniMain(data): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + "/alumni_main", data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getUserAlumniMain(id): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + "/alumni_main/" + id, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  createWork(data): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + "/work", data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getUserAlumniWork(id): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + "/work/" + id, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAllUsers(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + "/user", this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }


  getAllAlumniMains(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + "/alumni_main", this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  login(req: any): Observable<any>{

    return this.httpClient
      .post(this.baseUrl + '/auth/sign_in', req)
      .pipe(
        map((response: any ) => {
          this.cookieService.setToken(this.token_name, response.token);
          this.cookieService.setToken('user_type_id', response.user_type_id);
          this.cookieService.setToken('user_id', response.user_id);
          return response;
        })
      );
  }

  getToken(): string | undefined {
    // Retrieve the token from the cookie
    return this.cookieService.getToken(this.token_name);
  }
}
