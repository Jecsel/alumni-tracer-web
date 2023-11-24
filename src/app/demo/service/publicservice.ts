import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Image } from '../domain/image';

@Injectable()
export class PublicService {

    constructor(private http: HttpClient) { }

    getImages() {
    return this.http.get<any>('assets/demo/data/public.json')
      .toPromise()
      .then(res => res.data as Image[])
      .then(data => data);
    }
}
