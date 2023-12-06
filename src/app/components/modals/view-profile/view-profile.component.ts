import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  providers: [MessageService],
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  @Input() profile;

  first_name: any;
  middle_name: any;
  last_name: any;
  batch_year: any;
  // personalForm: FormGroup;
  msgs: Message[] = [];

  personalForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.required),
    batch_year: new FormControl(null, Validators.required),
    dob: new FormControl(null, Validators.required),  
    age: new FormControl('', Validators.required),
    civil_status: new FormControl(null, Validators.required),
    gender: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    municipality: new FormControl('', Validators.required),
    barangay: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    year_graduated: new FormControl('', Validators.required),
    email_address: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required)
  });
  
  user_types: any[] = [
    { id: 1, name: 'Regular User' },
    { id: 2, name: 'Admin' },
  ];

  genders: any[] = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];

  civil_statuses: any[] = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Married' },
    { id: 2, name: 'Widowed' }
  ];


  batch_years: any[] = [
    { id: 1, year: 2023 },
    { id: 2, year: 2022 },
    { id: 1, year: 2021 },
    { id: 2, year: 2020 },
    { id: 1, year: 2019 },
    { id: 2, year: 2018 },
  ]

  selectedState: any = null;

  
  constructor(private cookieService: AuthCookieService, private apiService: ApiService, private router: Router, private service: MessageService) { 

  }

  ngOnInit(): void {
    console.log('myprofile', this.profile);

    if (this.profile) {
      this.personalForm.patchValue({
        first_name: this.profile.first_name,
        middle_name: this.profile.middle_name,
        last_name: this.profile.last_name,
        batch_year: this.profile.batch_year,
        dob: this.profile.dob,
        age: this.profile.age,
        civil_status: this.profile.civil_status != null ? this.civil_statuses[this.profile.civil_status - 1] : this.civil_statuses[0],
        gender: this.profile.gender != null ? this.genders[this.profile.gender - 1] : this.genders[0],
        region: this.profile.region,
        province: this.profile.province,
        municipality: this.profile.municipality,
        barangay: this.profile.barangay,
        course: this.profile.course,
        year_graduated: this.profile.year_graduated,
        email_address: this.profile.email_address,
        phone_number: this.profile.phone_number,
      });
    }
  }

  update() {
    let form_value = this.personalForm.value;
    form_value.id = this.profile.id;
    form_value.batch_year = form_value.year_graduated;
    form_value.civil_status = form_value.civil_status.id;
    form_value.gender = form_value.gender.id;
    form_value.user_id = parseInt(this.cookieService.getToken('user_id')) ?? 1;
    form_value.batch_years = form_value.year_graduated;

    console.log('confirm', form_value);

    const register_data = { user: form_value};
    this.apiService.updateAlumni(register_data).subscribe(
      res => {
        console.log('updateAlumni', res);
        // this.router.navigate(['registration/work']);
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Personal profile updated!' });

      },
      err => {
        console.log(err);
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please check required fields!' });
      }
    );
  }

  isFirstComplete(): boolean {
    return (
      this.personalForm.get('first_name').valid &&
      this.personalForm.get('last_name').valid
    );
  }


}

