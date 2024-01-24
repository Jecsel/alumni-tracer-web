import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {
  sortField: string;
  sortOptions: SelectItem[];
  sortOrder: number;
  jobs: any = [];
  events: any = [];

  upcomingEvents: any = [];
  userType: string = 'user';

  showViewEventDialog: boolean = false;
  selectedEvent: any;

  showViewCurrentEventDialog: boolean = false;
  selectedCurrentEvent: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllJobs();
    this.getAllCurrentEvents();
    this.getAllUpcomingEvents();
  }

  viewEvent(data) {
    console.log('View Job', data);
    this.selectedEvent = data;
    this.showViewEventDialog = true;
  }

  viewCurrentEvent(data) {
    console.log('View Job', data);
    this.selectedCurrentEvent = data;
    this.showViewCurrentEventDialog = true;
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

}
