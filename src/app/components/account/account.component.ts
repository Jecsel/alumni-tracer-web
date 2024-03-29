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

        

        this.cols = [
            {field: 'first_name', header: 'First Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];

        this.statuses = [
            {label: 'APPROVED', value: 'instock'},
            {label: 'PENDING', value: 'lowstock'},
            {label: 'REJECTED', value: 'outofstock'}
        ];

        this.getAllAlumniMains();
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
        this.deleteProductDialog = true;
        this.account = {...account};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
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
