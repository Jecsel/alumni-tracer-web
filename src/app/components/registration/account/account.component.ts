import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Output() formValidityChanged = new EventEmitter<boolean>();
  @Output() componentInitialized = new EventEmitter<void>();

  accountForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('' , [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirm_password: new FormControl('' , [
      Validators.required,
      Validators.minLength(8)
    ]),
    user_type_id: new FormControl(1)
  });

  passwordsMatchValidator(): { [key: string]: boolean } | null {
    const password = this.accountForm.value.password;
    const confirm_password = this.accountForm.value.confirm_password;

    return password === confirm_password ? null : { 'passwordsNotMatch': true };
  }

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

  constructor(private apiService: ApiService, private router: Router, private cookieService: AuthCookieService) {
    this.accountForm.valueChanges.subscribe(() => {
      this.formValidityChanged.emit(this.accountForm.valid);
    });
  }

  ngOnInit(): void {
  }

  confirm() {

    let form_value = this.accountForm.value;
    form_value.user_type_id = 1;
    form_value.is_active = true;
    console.log('sign_up', form_value);

    const register_data = { user: form_value};
    this.cookieService.setToken('user_email', form_value.username);
    this.apiService.registerUser(register_data).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('user_id', res.id);
        this.cookieService.setToken('user_id', res.user.id);
        alert(res.message);
        this.router.navigate(['registration/personal']);
      },
      err => {
        console.log(err);
        alert(err.error.message);
      }
    );
  }

  ngAfterViewInit() {
    this.componentInitialized.emit();
  }

}
