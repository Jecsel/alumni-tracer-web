import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  providers: [MessageService],
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  isWorking: string;
  workType: string = 'private';
  msgs: Message[] = [];
  isItRelated: boolean = false;
  isWorkSector: boolean = false;

  workForm: FormGroup = new FormGroup({
    is_working: new FormControl(''),
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

  constructor(private apiService: ApiService, private router: Router, private service: MessageService, private cookieService: AuthCookieService) { }

  ngOnInit(): void {
  }

  confirm() {
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

}
