import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService]
})
export class ForgotPasswordComponent implements OnInit {
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

  constructor(private apiService: ApiService, private router: Router, private cookieService: AuthCookieService, private service: MessageService) {
    this.accountForm.valueChanges.subscribe(() => {
      this.formValidityChanged.emit(this.accountForm.valid);
    });
  }

  ngOnInit(): void {
  }

  confirm() {

    let form_value = this.accountForm.value;

    const register_data = { user: form_value};
    this.apiService.forgotPassword(register_data).subscribe(
      res => {
        console.log(res);
        // alert(res.message);
        this.showSuccessViaToast(res.message);
      },
      err => {
        console.log(err);
        // alert(err.error.message);
        this.showErrorViaToast(err.error.message);
      }
    );
  }

  showErrorViaToast(mess) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: mess});
  }

  showSuccessViaToast(mess) {
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: mess });
  }

  ngAfterViewInit() {
    this.componentInitialized.emit();
  }

}
