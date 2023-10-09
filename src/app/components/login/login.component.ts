import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;

  formLogin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('' , [Validators.required,Validators.minLength(8)])
  });

  constructor(public router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
  }

  confirm() {
    let login_data = this.formLogin.value;
    this.apiService.login({user: login_data}).subscribe(
      res => {
        console.log("Login", res);
        this.router.navigate(['dashboard']);
      }, err => {
        console.log(err);
      }
    )
  }

}
