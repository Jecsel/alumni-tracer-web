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
  personalForm: FormGroup;
  msgs: Message[] = [];

  // personalForm: FormGroup = new FormGroup({
  //   first_name: new FormControl('', Validators.required),
  //   last_name: new FormControl('', Validators.required),
  //   batch_year: new FormControl(null, Validators.required),
  //   dob: new FormControl(null, Validators.required),  
  //   age: new FormControl('', Validators.required),
  //   civil_status: new FormControl(null, Validators.required),
  //   gender: new FormControl('', Validators.required),
  //   region: new FormControl('', Validators.required),
  //   province: new FormControl('', Validators.required),
  //   municipality: new FormControl('', Validators.required),
  //   barangay: new FormControl('', Validators.required),
  //   course: new FormControl('', Validators.required),
  //   year_graduated: new FormControl('', Validators.required),
  //   email_address: new FormControl('', Validators.required),
  //   phone_number: new FormControl('', Validators.required)
  // });
  
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

    // this.personalForm = this.fb.group({
    //   first_name: ['', Validators.required],
    //   middle_name: ['', Validators.required],
    //   last_name: ['', Validators.required],
    //   batch_year: [null, Validators.required],
    //   dob: [null, Validators.required],
    //   age: ['', Validators.required],
    //   civil_status: [null, Validators.required],
    //   gender: ['', Validators.required],
    //   region: ['', Validators.required],
    //   province: ['', Validators.required],
    //   municipality: ['', Validators.required],
    //   barangay: ['', Validators.required],
    //   course: ['', Validators.required],
    //   year_graduated: ['', Validators.required],
    //   email_address: ['', Validators.required],
    //   phone_number: ['', Validators.required]
    // });

    this.personalForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: [''],
      batch_year: [null],
      dob: [null],
      age: [''],
      civil_status: [null],
      gender: [''],
      region: [''],
      province: [''],
      municipality: [''],
      barangay: [''],
      course: [''],
      year_graduated: [''],
      email_address: [''],
      phone_number: ['']
    });

    this.personalForm.valueChanges.subscribe(() => {
      this.formValidityChanged.emit(this.personalForm.valid);
    });
  }

  ngOnInit(): void {
  }

  confirm() {
    let form_value = this.personalForm.value;
    form_value.batch_year = form_value.batch_year.year;
    form_value.civil_status = form_value.civil_status.id;
    form_value.gender = form_value.gender.id;
    form_value.user_id = parseInt(this.cookieService.getToken('user_id')) ?? 1;

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
