import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/demo/domain/product';
import { PhotoService } from 'src/app/demo/service/photoservice';
import { PublicService } from 'src/app/demo/service/publicservice';
import { ApiService } from 'src/app/services/api/api.service';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  showLoginModal = false;

  formLogin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('' , [Validators.required,Validators.minLength(8)])
  });

  products: Product[];

  images: any[];

  galleriaResponsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  carouselResponsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  msgs: Message[] = [];


  constructor(public router: Router, public apiService: ApiService, private publicService: PublicService, private service: MessageService) { }

  block7: string = `
  <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
      <div class="grid">
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Orders</span>
                          <div class="text-900 font-medium text-xl">152</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">24 new </span>
                  <span class="text-500">since last visit</span>
              </div>
          </div>
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Revenue</span>
                          <div class="text-900 font-medium text-xl">$2.100</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">%52+ </span>
                  <span class="text-500">since last week</span>
              </div>
          </div>
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Customers</span>
                          <div class="text-900 font-medium text-xl">28441</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">520  </span>
                  <span class="text-500">newly registered</span>
              </div>
          </div>
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Comments</span>
                          <div class="text-900 font-medium text-xl">152 Unread</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-comment text-purple-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">85 </span>
                  <span class="text-500">responded</span>
              </div>
          </div>
      </div>
  </div>`;

  ngOnInit(): void {
    this.getPhotos();
  }

    showErrorViaToast(mess) {
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: mess});
    }

    showSuccessViaToast() {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    }

  openModalLogin() {
    this.showLoginModal = !this.showLoginModal;
  }

  getPhotos(){
    this.publicService.getImages().then(images => {
        this.images = images;
    });
  }

  confirm() {
    let login_data = this.formLogin.value;
    this.apiService.login({user: login_data}).subscribe(
      res => {
        console.log("Login", res);
        const user_type_id = res.user_type_id;
        if(user_type_id === 2) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['homepage']);
        }
       
      }, err => {
        console.log(err);
        this.showErrorViaToast(err.error.message);
      }
    )
  }

}
