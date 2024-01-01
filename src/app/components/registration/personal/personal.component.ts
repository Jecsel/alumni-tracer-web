import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { MessageService, Message } from "primeng/api";
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  providers: [MessageService],
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  @Output() formValidityChanged = new EventEmitter<boolean>();
  first_name: any;
  middle_name: any;
  last_name: any;
  batch_year: any;
  // personalForm: FormGroup;
  msgs: Message[] = [];
  maxDate: string;
  age: number | undefined;

  personalForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.required),
    batch_year: new FormControl(null),
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

  constructor(private service: MessageService, public router: Router, public apiService: ApiService, private fb: FormBuilder, private cookieService: AuthCookieService) { 

    this.maxDate = this.getCurrentDate();

    this.personalForm.valueChanges.subscribe(() => {
      this.formValidityChanged.emit(this.personalForm.valid);
    });
  }

  ngOnInit(): void {
    this.maxDate = this.getCurrentDate();

    this.personalForm
    .get("dob")
    .valueChanges.subscribe((val) => {
      // this.personalForm.value.perf_ind_id = val;
      this.updateAge();
  });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as 'yyyy-MM-dd' (the format expected by the input type date)
    return currentDate.toISOString().split('T')[0];
  }

  calculateAge() {
    if (this.personalForm.value.dob) {
      const birthdate = new Date(this.personalForm.value.dob);
      const today = new Date();
      
      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDiff = today.getMonth() - birthdate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
      
      this.age = age;
    } else {
      this.age = undefined;
    }

    console.log(this.age);
    return this.age;
  }

  updateAge() {
    const dobValue = this.personalForm.get('dob')?.value;

    if (dobValue) {
      const age = this.calculateAge();
      this.personalForm.patchValue({ age });
      this.personalForm.value.age = age;
    } else {
      this.personalForm.patchValue({ age: '' });
    }
  }

  confirm() {
    let form_value = this.personalForm.value;
    form_value.batch_year = form_value.year_graduated;
    form_value.civil_status = form_value.civil_status.id;
    form_value.gender = form_value.gender.id;
    form_value.user_id = parseInt(this.cookieService.getToken('user_id')) ?? 1;
    form_value.batch_years = form_value.year_graduated;

    console.log('confirm', form_value);

    const register_data = { user: form_value};
    this.apiService.createAlumniMain(register_data).subscribe(
      res => {
        console.log('createAlumniMain', res);
        this.router.navigate(['registration/work']);
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Personal profile created!' });

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
