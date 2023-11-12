import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
    templateUrl: './registration.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

    breadcrumbItems: MenuItem[];
 
    tieredItems: MenuItem[];

    items: MenuItem[];

    routeItems: MenuItem[];

    megaMenuItems: MegaMenuItem[];

    panelMenuItems: MenuItem[];

    stepsItems: MenuItem[];

    slideItems: MenuItem[];

    menuItems: MenuItem[];

    plainMenuItems: MenuItem[];

    pageIndex: number = 0;

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

}
