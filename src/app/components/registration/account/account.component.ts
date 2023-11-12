import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  formPersonal: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('' , [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirm_password: new FormControl('' , [
      Validators.required,
      Validators.minLength(8)
    ]),
    user_type_id: new FormControl(null, Validators.required)
  });

  batch_years: any[] = [
    { id: 1, year: 2023 },
    { id: 2, year: 2022 },
    { id: 1, year: 2021 },
    { id: 2, year: 2020 },
    { id: 1, year: 2019 },
    { id: 2, year: 2018 },
  ]

  user_types: any[] = [
    { id: 1, name: 'Regular User' },
    { id: 2, name: 'Admin' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  confirm() {

  }

}
