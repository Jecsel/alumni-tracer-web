import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Table} from 'primeng/table';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { Product } from 'src/app/demo/domain/product';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ProductService } from 'src/app/demo/service/productservice';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    providers: [MessageService, ConfirmationService],
    styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
    
    productDialog: boolean;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    products: any;
    account: any;
    selectedProducts: Product[];
    submitted: boolean;
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [5, 10, 20];

    showDialog: boolean = false;
    myProfile: any = {};
    myWorkProfile: any = {};

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,
                private apiService: ApiService) {
        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Crud'}
        ]);
    }
  
    ngOnInit() {
        // this.productService.getUsers().then(
        //     data => {
        //         this.products = data;
        //         console.log("products", this.products);
        //         }
        //     );

        

        // this.cols = [
        //     {field: 'first_name', header: 'First Name'},
        //     {field: 'price', header: 'Price'},
        //     {field: 'category', header: 'Category'},
        //     {field: 'rating', header: 'Reviews'},
        //     {field: 'inventoryStatus', header: 'Status'}
        // ];

        this.cols = [
            { field: 'first_name', header: 'First Name' },
            { field: 'last_name', header: 'Last Name' },
            { field: 'batch_year', header: 'Batch Year' },
            { field: 'dob', header: 'Date of Birth' },
            { field: 'age', header: 'Age' },
            { field: 'civil_status', header: 'Civil Status' },
            { field: 'gender', header: 'Gender' },
            { field: 'region', header: 'Region' },
            { field: 'province', header: 'Province' },
            { field: 'municipality', header: 'Municipality' },
            { field: 'barangay', header: 'Barangay' },
            { field: 'course', header: 'Course' },
            { field: 'email_address', header: 'Email Address' },
            { field: 'phone_number', header: 'Phone Number' },
            { field: 'work_status', header: 'Work Status' },
            { field: 'work_sector', header: 'Work Sector' },
            { field: 'it_related', header: 'IT Related' },
            { field: 'work_type', header: 'Work Type' },
            { field: 'work_position', header: 'Work Position' },
            { field: 'business_name', header: 'Business Name' },
            { field: 'company_name', header: 'Company Name' },
            { field: 'company_address', header: 'Company Address' },
            { field: 'company_acronym', header: 'Company Acronym' },
            { field: 'type_of_business', header: 'Type of Business' },
            { field: 'area_of_business', header: 'Area of Business' },
            { field: 'business_address', header: 'Business Address' }
          ];

        this.statuses = [
            {label: 'APPROVED', value: 'instock'},
            {label: 'PENDING', value: 'lowstock'},
            {label: 'REJECTED', value: 'outofstock'}
        ];

        // this.getAllAlumniMains();
        this.joinAlumniWork();
    }

    showProfile(prof){
        const wrk = {
            work_status: 'yes',
            work_sector: prof.is_gov_sect,
            it_related: prof.is_it_related,
            work_type:  prof.work_type,
            work_position: prof.work_position,
            business_name: prof.business_name,
            company_name: prof.company_name,
            company_address: prof.company_address,
            company_acronym: prof.company_acronym,
            type_of_business: prof.type_of_business,
            area_of_business: prof.area_of_business,
            business_address: prof.business_address
        };

        this.showDialog = true;
        this.myProfile = prof;
        this.myWorkProfile = wrk;
    }

    getAllAlumniMains() {
       this.apiService.getAllAlumniMains().subscribe(
            res => {
                console.log("getAllAlumniMains", res);
                this.products = res.data;
            }, 
            err => {
                console.log(err);
            }
       ) 
    }

    joinAlumniWork() {
        this.apiService.joinAlumniWork().subscribe(
            (res) => {
                this.products = res.data;
            },
            (err) => {
                console.log(err);
            }
        );
    }


    openNew() {
        this.account = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(account: any) {
        this.account = {...account};
        this.productDialog = true;
    }

    deleteProduct(account: any) {
        console.log(account);
        this.deleteProductDialog = true;
        this.account = {...account};
        this.confirmDelete(account.id);
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(id){
        this.apiService.deleteAlumni(id).subscribe(
            res => {
                console.log(res);
            }, err => {
                console.log(err);
            }
        )

        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.account.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.account = {};
    }



    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.account.name.trim()) {
            if (this.account.id) {
                // @ts-ignore
                this.account.inventoryStatus = this.account.inventoryStatus.value ? this.account.inventoryStatus.value: this.account.inventoryStatus;
                this.products[this.findIndexById(this.account.id)] = this.account;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.account.id = this.createId();
                this.account.code = this.createId();
                this.account.image = 'account-placeholder.svg';
                // @ts-ignore
                this.account.inventoryStatus = this.account.inventoryStatus ? this.account.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.account);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.account = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
