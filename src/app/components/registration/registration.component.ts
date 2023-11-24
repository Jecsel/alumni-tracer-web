import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { PersonalComponent } from './personal/personal.component';
import { AccountComponent } from './account/account.component';

@Component({
    templateUrl: './registration.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

    @ViewChild(PersonalComponent) personalComponent: PersonalComponent;
    @ViewChild(AccountComponent) accountComponent: AccountComponent;

    breadcrumbItems: MenuItem[];
    tieredItems: MenuItem[];
    items: MenuItem[];
    megaMenuItems: MegaMenuItem[];
    panelMenuItems: MenuItem[];
    stepsItems: MenuItem[];
    slideItems: MenuItem[];
    menuItems: MenuItem[];
    plainMenuItems: MenuItem[];
    pageIndex: number = 0;

    
    routeItems: any[] = [
        { label: 'Personal', routerLink: ['/registration/personal'] },
        { label: 'Account', routerLink: ['/registration/account'] },
        // Add other steps as needed
    ];

    canNavigateToNextStep: boolean[] = [false, false]; // Tracks the validity of each step


    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'UI Kit'},
            {label: 'Menu'}
        ]);
    }

    ngOnInit() {

        this.routeItems = [
            {label: 'Account', routerLink:'account'},
            {label: 'Personal', routerLink:'personal'},
            {label: 'Work', routerLink:'work'}
        ];    
    }

    checkPages() {
        console.log( this.personalComponent?.personalForm);
        console.log( this.accountComponent?.accountForm);
    }

    // ngAfterViewInit() {

    //     console.log( this.personalComponent?.personalForm);
    //     console.log( this.accountComponent?.batch_years);
    //     this.personalComponent?.formValidityChanged.subscribe((validity) => {
    //       this.canNavigateToNextStep[0] = validity;
    //     });
    
    //     this.accountComponent?.formValidityChanged.subscribe((validity) => {
    //       this.canNavigateToNextStep[1] = validity;
    //     });
    // }

    ngAfterViewInit() {
        this.accountComponent?.componentInitialized.subscribe(() => {
          // Now accountComponent is initialized
        });
      }

    areAllStepsValid(): boolean {
        return this.canNavigateToNextStep.every((valid) => valid);
    }
    

}
