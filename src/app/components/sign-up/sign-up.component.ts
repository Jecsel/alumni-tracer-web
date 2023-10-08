import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username: any;
  password: any;
  confirm_password: any;
  user_type: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  batch_year: any;

  
  user_types: any[] = [
    { id: 1, name: 'Regular User' },
    { id: 2, name: 'Admin' },
  ];

  batch_years: any[] = [
    { id: 1, year: 2023 },
    { id: 2, year: 2022 },
    { id: 3, year: 2021 },
    { id: 4, year: 2020 },
    { id: 5, year: 2019 }
  ]

  selectedState: any = null;

  states: any[] = [
      {name: 'Arizona', code: 'Arizona'},
      {name: 'California', value: 'California'},
      {name: 'Florida', code: 'Florida'},
      {name: 'Ohio', code: 'Ohio'},
      {name: 'Washington', code: 'Washington'}
  ];

  dropdownItems = [
      { name: 'Option 1', code: 'Option 1' },
      { name: 'Option 2', code: 'Option 2' },
      { name: 'Option 3', code: 'Option 3' }
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;

  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'UI Kit'},
      {label: 'Form Layout'}
    ]);
   }

  ngOnInit(): void {
  }

}
