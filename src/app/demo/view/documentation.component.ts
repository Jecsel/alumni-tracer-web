import {Component} from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
    templateUrl: './documentation.component.html',
    styles: [`
        .docs pre {
            font-family: monospace;
            background-color: #dee4e9;
            color: #757575;
            padding: 1em;
            font-size: 14px;
            border-radius: 3px;
            overflow: auto;
        }`
    ]
})
export class DocumentationComponent {
    
    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Documentation', routerLink: ['/documentation'] }
        ]);
    }
}
