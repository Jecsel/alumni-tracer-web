import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsgcService {
  private apiUrl = 'https://psgc.gitlab.io/api';

  constructor(private http: HttpClient) { }

  getRegions(): Observable<any> {
    const url = `${this.apiUrl}/regions/`;
    return this.http.get(url);
  }

  getProvinces(regionCode): Observable<any> {
    const url = `${this.apiUrl}/regions/${regionCode}/provinces/`;
    return this.http.get(url);
  }

  getMunicipalities(provinceCode): Observable<any> {
    const url = `${this.apiUrl}/provinces/${provinceCode}/municipalities/`;
    return this.http.get(url);
  }

  getBrgys(municipalityCode): Observable<any> {
    const url = `${this.apiUrl}/municipalities/${municipalityCode}/barangays/`;
    return this.http.get(url);
  }
}
