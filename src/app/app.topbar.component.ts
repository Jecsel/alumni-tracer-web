import { Component } from '@angular/core';
import { AppMainComponent} from './app.main.component';
import { MenuItem } from 'primeng/api';
import { AuthCookieService } from './services/auth/auth-cookie-service.service';
import { Console } from 'console';
import { ApiService } from './services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    isRegUser: Boolean = false;
    myProfile: any = {};
    myWorkProfile: any = {};
    showDialog: boolean = false;
    userTypeId = '1';
  
    constructor(public app: AppMainComponent, public authCookie: AuthCookieService, private apiService: ApiService, private router: Router ) {}
  
    ngOnInit(): void {
      this.items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
        { label: 'Documentation', icon: 'pi pi-fw pi-file' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' }
      ];
  
      this.getUserType();
      this.activeItem = this.items[0];
      this.getUserProfile();
    }

    getUserProfile() {
      var usr_id = this.authCookie.getToken('user_id');
      this.userTypeId = this.authCookie.getToken('user_type_id');
    
      this.apiService.getUserAlumniMain(usr_id).subscribe(
        res => {
          console.log('User userTypeId', this.userTypeId);
          this.myProfile = res.data;
          this.myWorkProfile = res.work;
          console.log('myProfile', this.myProfile);
          if(!this.myProfile || this.myProfile == null && !this.getUserType()){
            this.router.navigate(['registration/personal']);
          }
        },
        err => {
          console.log('Error', err);
        }
      )
    }

    showProfile() {
      this.showDialog = true;
    }
  
    onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
    }
  
    activateLast() {
      this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
    }

    getUserType() {
      const user_type_id: any = this.authCookie.getToken('user_type_id')
      console.log('user_type', user_type_id);
      if(user_type_id === 2 || user_type_id === '2'){
        this.isRegUser = false;
      } else {  
        this.isRegUser = true;
      }
      return this.isRegUser;
    }
  
  }
