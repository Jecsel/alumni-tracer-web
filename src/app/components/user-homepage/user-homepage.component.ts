import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Product } from 'src/app/demo/domain/product';
import { AnnouncementService } from 'src/app/demo/service/announcmentservice';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

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

  isActiveButton = 'personal';
  myProfile: any = {};
  jobs: any = [];

  constructor(private announcementService: AnnouncementService, public authCookie: AuthCookieService, private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getProductList();
    this.getUserProfile();
    this.getAllJobs();
  }

  selectPersonal() {
    this.isActiveButton = 'personal';
  }

  selectStatus() {
    this.isActiveButton = 'status';
  }

  selectUpload() {
    this.isActiveButton = 'uploaded';
  }

  getUserProfile() {
    var usr_id = this.authCookie.getToken('user_id');
  
    this.apiService.getUserAlumniMain(usr_id).subscribe(
      res => {
        console.log('User Profile', res);
        this.myProfile = res.data;
        console.log('myProfile', this.myProfile);
      },
      err => {
        console.log('Error', err);
      }
    )
  }
  
  getAllJobs() {
    this.apiService.getAllJobPost().subscribe(
        res => {
            console.log('all Jobs: ', res.data);
            this.jobs = res.data;
        },
        err => {
            console.log(err);
        }
    )
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
