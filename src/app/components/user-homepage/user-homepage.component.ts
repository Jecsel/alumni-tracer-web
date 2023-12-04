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
  events: any = [];

  upcomingEvents: any = [];
  showViewJobDialog: boolean = false;
  selectedJob: any;

  showViewEventDialog: boolean = false;
  selectedEvent: any;

  constructor(private announcementService: AnnouncementService, public authCookie: AuthCookieService, private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getAllActiveJobs();
    this.getAllCurrentEvents();
    this.getAllUpcomingEvents();
  }

  viewEvent(data) {
    console.log('View Job', data);
    this.selectedEvent = data;
    this.showViewEventDialog = true;
}

viewJob(data) {
    console.log('View Job', data);
    this.selectedJob = data;
    this.showViewJobDialog = true;
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
  
  getAllActiveJobs() {
    this.apiService.getAllActiveApproveJobs().subscribe(
        res => {
            console.log('all Jobs: ', res.data);
            this.jobs = res.data;
        },
        err => {
            console.log(err);
        }
    )
  }

  getAllCurrentEvents() {
    this.apiService.getCurrentEvents().subscribe(
      res => {
        console.log('all Events: ', res.data);
        this.events = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllUpcomingEvents() {
    this.apiService.getUpcomingEvents().subscribe(
      res => {
        console.log('all Events: ', res.data);
        this.upcomingEvents = res.data;
      },
      err => {
        console.log(err);
      }
    )
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
