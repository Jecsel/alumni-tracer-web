import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../domain/product';

@Injectable()
export class AnnouncementService {

    constructor(private http: HttpClient) { }

    getAnnouncements() {
        return this.http.get<any>('assets/demo/data/announcement.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }
}
