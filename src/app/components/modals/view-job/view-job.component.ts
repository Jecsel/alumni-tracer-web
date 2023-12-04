import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  @Input() jobDialogStat;
  @Input() jobData;

  jobDialog: boolean;
  selectedFile: File | null = null;
  showUpdateBtn: boolean = true;
  

  formJob: FormGroup = new FormGroup({
    company_name: new FormControl('', [Validators.required]),
    company_email: new FormControl('' , [Validators.required]),
    company_address: new FormControl('', Validators.required),
    position: new FormControl('' , [Validators.required]),
    qualification: new FormControl('' , [Validators.required]),
    deployment_date: new FormControl(null, [Validators.required]),
    active_date: new FormControl(null, [Validators.required])
});

  constructor(private apiService: ApiService, private cookieService: AuthCookieService) { }

  ngOnInit(): void {
    this.jobDialog = this.jobDialogStat;
    console.log('showing dialog');  
    console.log('selected Job', this.jobData);

    this.formJob.patchValue({
      company_name: this.jobData.company_name,
      company_email: this.jobData.company_email,
      company_address: this.jobData.company_address,
      position: this.jobData.position,
      qualification: this.jobData.qualification,
      deployment_date: this.jobData.deployment_date,
      active_date: this.jobData.active_date
    });

    this.showUpdateBtn = this.cookieService.getToken('user_type_id') == '2';
  }

  hideDialog() {
    this.jobDialog = false;
    this.jobDialogStat = false;
    location.reload();
  }

  onFileSelected(event: any): void {
    // this.file = event.target.files[0];
    this.selectedFile = event.target.files[0];
  }

  updateSelectedJob() {
    let form_value = this.formJob.value;
    form_value.id = this.jobData.id;

    this.apiService.updateSelectedJob({job: form_value}).subscribe(
      res => {
        console.log(res);
        this.hideDialog();
      }, err => {
        console.log(err);
      }
    )
  }

}
