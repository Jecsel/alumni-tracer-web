import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Product } from 'src/app/demo/domain/product';
import { AnnouncementService } from 'src/app/demo/service/announcmentservice';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss']
})
export class UserHomepageComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  products: Product[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sourceCities: any[];
  targetCities: any[];
  orderCities: any[];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.announcementService.getAnnouncements().then(data => this.products = data);

    this.sourceCities = [
        {name: 'San Francisco', code: 'SF'},
        {name: 'London', code: 'LDN'},
        {name: 'Paris', code: 'PRS'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Berlin', code: 'BRL'},
        {name: 'Barcelona', code: 'BRC'},
        {name: 'Rome', code: 'RM'}];
    this.targetCities = [];

    this.orderCities = [
        {name: 'San Francisco', code: 'SF'},
        {name: 'London', code: 'LDN'},
        {name: 'Paris', code: 'PRS'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Berlin', code: 'BRL'},
        {name: 'Barcelona', code: 'BRC'},
        {name: 'Rome', code: 'RM'}];

    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];
}

onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}


}
