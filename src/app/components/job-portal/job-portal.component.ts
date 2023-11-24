import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import {MessageService, ConfirmationService} from 'primeng/api';
import { ProductService } from 'src/app/demo/service/productservice';
import { ApiService } from 'src/app/services/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: "app-job-portal",
  templateUrl: "./job-portal.component.html",
  providers: [MessageService, ConfirmationService],
  styleUrls: ["./job-portal.component.scss"],
})

export class JobPortalComponent implements OnInit {
   
    jobDialog: boolean;
    deleteJobDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    job: any;
    selectedJobs: any;
    submitted: boolean;
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [5, 10, 20];
    jobs: any = [];

    file: File = null;
    selectedFile: File | null = null;


    formJob: FormGroup = new FormGroup({
        company_name: new FormControl('', [Validators.required]),
        company_email: new FormControl('' , [Validators.required]),
        company_address: new FormControl('', Validators.required),
        position: new FormControl('' , [Validators.required]),
        qualification: new FormControl('' , [Validators.required])
    });

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,
                private apiService: ApiService, private cookieService: AuthCookieService) {
        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Crud'}
        ]);
    }
  
    ngOnInit() {

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

        // this.getAllAlumniMains();
        this.getAllJobs();
    }

    getAllJobs() {
        this.apiService.getAllJobPost().subscribe(
            res => {
                console.log('all Jobs: ', res.data);
                this.jobs = res.data;
            },
            err => {
                console.log(err);
            }
        )
    }

    onFileSelected(event: any): void {
        // this.file = event.target.files[0];
        this.selectedFile = event.target.files[0];
      }
    
      uploadFile(): void {
        if (this.selectedFile != null) {

            let form_value = this.formJob.value;
            form_value.user_id = parseInt(this.cookieService.getToken('user_id')) ?? 1;


        //   const formData: FormData = new FormData();
      
        //   formData.append('company_name', this.formJob.get('company_name')?.value);
        //   formData.append('company_email', this.formJob.get('company_email')?.value);
        //   formData.append('position', this.formJob.get('position')?.value);
        //   formData.append('qualification', this.formJob.get('qualification')?.value);
        //   formData.append('user_id', this.cookieService.getToken('user_id'));
      
        //   formData.append('file', this.file, this.file.name);
      
          console.log('formData', form_value);
      
          this.apiService.createJobPost({ job: form_value }).subscribe(
            res => {
              console.log('job_post', res);
              this.addImage();
            },
            err => {
              console.log('error: ', err);
            }
          );
        }
      }

      addImage(): void {
        if (!this.selectedFile) {
          // Handle the case where no file is selected
          return;
        }
    
        const formData = new FormData();

        formData.append('name', this.selectedFile.name);
        formData.append('image', this.selectedFile);
    
        // Assuming you have a service to handle HTTP requests
        this.apiService.updateJobPostImage(formData).subscribe(
          (response) => {
            console.log(response);
            // Handle success
          },
          (error) => {
            console.error(error);
            // Handle error
          }
        );
      }


    openNew() {
        this.job = {};
        this.submitted = false;
        this.jobDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(job: any) {
        this.job = {...job};
        this.jobDialog = true;
    }

    deleteProduct(job: any) {
        this.deleteJobDialog = true;
        this.job = {...job};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.jobs = this.jobs.filter(val => !this.selectedJobs.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedJobs = null;
    }

    confirmDelete(){
        this.deleteJobDialog = false;
        this.jobs = this.jobs.filter(val => val.id !== this.job.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Job Deleted', life: 3000});
        this.job = {};
    }

    hideDialog() {
        this.jobDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.job.name.trim()) {
            if (this.job.id) {
                // @ts-ignore
                this.job.inventoryStatus = this.job.inventoryStatus.value ? this.job.inventoryStatus.value: this.job.inventoryStatus;
                this.jobs[this.findIndexById(this.job.id)] = this.job;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Job Updated', life: 3000});
            } else {
                this.job.id = this.createId();
                this.job.code = this.createId();
                this.job.image = 'job-placeholder.svg';
                // @ts-ignore
                this.job.inventoryStatus = this.job.inventoryStatus ? this.job.inventoryStatus.value : 'INSTOCK';
                this.jobs.push(this.job);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Job Created', life: 3000});
            }

            this.jobs = [...this.jobs];
            this.jobDialog = false;
            this.job = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].id === id) {
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
