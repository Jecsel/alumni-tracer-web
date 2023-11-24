import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cachedData: any;

  constructor() { }

  setCachedData(data: any): void {
    this.cachedData = data;
  }

  getCachedData(): any {
    return this.cachedData;
  }
}
