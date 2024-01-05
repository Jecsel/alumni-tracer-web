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
  @Input() work;

  isWorking: string = 'no';
  workType: string = 'private';
  isItRelated: boolean = false;
  isWorkSector: boolean = false;

  workForm: FormGroup = new FormGroup({
    is_working: new FormControl('', Validators.required),
    work_type: new FormControl(''),
    work_position: new FormControl(''),
    business_name: new FormControl(''),
    company_name: new FormControl(''),
    company_address: new FormControl(''),
    company_acronym: new FormControl(''),
    type_of_business: new FormControl(''),
    area_of_business: new FormControl(''),
    business_address: new FormControl(''),
    business_acronym: new FormControl(''),
    business_related: new FormControl(''),
    line_of_busines: new FormControl(''),
    is_it_related: new FormControl(''),
    is_gov_sect: new FormControl('')
  });

  first_name: any;
  middle_name: any;
  last_name: any;
  batch_year: any;
  // personalForm: FormGroup;
  msgs: Message[] = [];
  is_updating = false;
  maxDate: string;
  age: number | undefined;

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
    
    if(this.work) {
      this.isWorking = this.work.is_working;
      this.workType = this.work.work_type;
      
      console.log('work data', this.work);
      this.workForm.patchValue({
        is_working: this.work.is_working,
        work_type: this.work.work_type,
        work_position: this.work.work_type,
        business_name: this.work.work,
        company_name: this.work.company_name,
        company_address: this.work.company_address,
        company_acronym: this.work.company_acronym,
        type_of_business: this.work.type_of_business,
        area_of_business: this.work.area_of_business,
        business_address: this.work.business_address,
        business_acronym: this.work.business_acronym,
        business_related: this.work.business_related,
        line_of_busines: this.work.line_of_busines,
        is_it_related: this.work.is_it_related,
        is_gov_sect: this.work.is_gov_sect
      });
    }
    
    this.disableAllFields();
  }

  this.personalForm
  .get("dob")
  .valueChanges.subscribe((val) => {
    // this.personalForm.value.perf_ind_id = val;
    this.updateAge();
  });
}

updateWork() {
  let form_value = this.workForm.value;
  form_value.user_id = parseInt(this.cookieService.getToken('user_id'));
  form_value.is_it_related = form_value.is_it_related == '1' ? true : false;
  form_value.is_gov_sect = form_value.is_gov_sect == '1' ? true : false;
  const register_data = { user: form_value};
  
  console.log('==== work Datas ====== : ', register_data);
  this.apiService.createWork(register_data).subscribe(
    res => {
      console.log('createAlumniMain', res);
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Work profile created!' });
      this.router.navigate(['/']);

    },
    err => {
      console.log(err);
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please check required fields!' });
    }
  );
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

  disableAllFields() {
    Object.keys(this.personalForm.controls).forEach(controlName => {
      this.personalForm.get(controlName).disable();
    });
  }

  enableAllFields() {
    Object.keys(this.personalForm.controls).forEach(controlName => {
      this.personalForm.get(controlName).enable();
    });
  }

  edit(){
    this.is_updating = true;
    this.enableAllFields();
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

