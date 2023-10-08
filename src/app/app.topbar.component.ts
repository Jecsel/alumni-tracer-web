import { Component } from '@angular/core';
import { AppMainComponent} from './app.main.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    isRegUser: Boolean = false;
  
    constructor(public app: AppMainComponent) {}
  
    ngOnInit(): void {
      this.items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
        { label: 'Documentation', icon: 'pi pi-fw pi-file' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' }
      ];
  
      this.activeItem = this.items[0];
    }
  
    onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
    }
  
    activateLast() {
        this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
    }
  
  }
