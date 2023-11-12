import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  first_name: any;
  middle_name: any;
  last_name: any;
  batch_year: any;

  formSignUp: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    batch_year: new FormControl(null, Validators.required)
  });

  
  user_types: any[] = [
    { id: 1, name: 'Regular User' },
    { id: 2, name: 'Admin' },
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

  constructor(public router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
  }

  confirm() {
    let form_value = this.formSignUp.value;
    form_value.batch_year = form_value.batch_year.year;

    console.log('sign_up', form_value);

    const register_data = { user: form_value};
    this.apiService.registerUser(register_data).subscribe(
      res => {
        this.router.navigate(['login']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
