import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  @Input() eventDialogStat;
  @Input() eventData;

  eventDialog: boolean;
  selectedFile: File | null = null;
  showUpdateBtn: boolean = true;

  formJob: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    venue: new FormControl('' , [Validators.required]),
    date: new FormControl('', Validators.required),
    time: new FormControl('' , [Validators.required]),
    sponsor: new FormControl('' , [Validators.required])
});

  constructor(private apiService: ApiService, private cookieService: AuthCookieService) { }

  ngOnInit(): void {
    this.eventDialog = this.eventDialogStat;
    console.log('showing dialog');  
    console.log('selected Job', this.eventData);

    this.formJob.patchValue({
      title: this.eventData.title,
      venue: this.eventData.venue,
      date: this.eventData.date,
      time: this.eventData.time,
      sponsor: this.eventData.sponsor
    });

    this.showUpdateBtn = this.cookieService.getToken('user_type_id') == '2';
  }

  onFileSelected(event: any): void {
    // this.file = event.target.files[0];
    this.selectedFile = event.target.files[0];
  }

  updateEvent() {
    let form_value = this.formJob.value;
    form_value.id = this.eventData.id;

    this.apiService.updateSelectedEvent({ event: form_value }).subscribe(
      res => {
        console.log(res);
        this.hideDialog();
      },
      err => {
        console.log(err);
      }
    )
  }

  hideDialog() {
    this.eventDialog = false;
    this.eventDialogStat = false;
    location.reload();
  }

}
