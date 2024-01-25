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
    showViewDialog: boolean = false;
    selectedJob: any;

    formJob: FormGroup = new FormGroup({
        company_name: new FormControl('', [Validators.required]),
        company_email: new FormControl('' , [Validators.required]),
        company_address: new FormControl('', Validators.required),
        position: new FormControl('' , [Validators.required]),
        qualification: new FormControl('' , [Validators.required]),
        job_seeker_email: new FormControl('' , [Validators.required]),
        job_seeker_contact: new FormControl('' , [Validators.required]),
        deployment_date: new FormControl(null, [Validators.required]),
        active_date: new FormControl(null, [Validators.required])
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

        this.formJob.get('job_seeker_contact')
            .valueChanges.subscribe((val: string) => {
                let sanitize_phone = this.removeLettersAndSpecialCharacters(val);
                console.log('sanitize_phone', sanitize_phone);
                this.formJob.patchValue({ job_seeker_contact: sanitize_phone});
            })

        // this.getAllAlumniMains();
        this.getAllJobs();
    }

    removeLettersAndSpecialCharacters(inputText: string): string {
        // Use regular expression to remove letters and special characters
        const cleanedText = inputText.replace(/[^0-9]/g, '');
        return cleanedText;
      }

    viewJob(data){
        console.log('View Job', data);
        this.selectedJob = data;
        this.showViewDialog = true;
        
    }

    getAllJobs() {
        this.apiService.getAllJobPost().subscribe(
            res => {
                console.log('all Jobs: ', res.data);
                this.jobs = res.data;
            },
            err => {
                console.log(err);
                this.showErrorViaToast('Contact your administrator');
            }
        )
    }
    

    showErrorViaToast(mess) {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: mess});
      }
    
    showSuccessViaToast(mess) {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: mess });
    }

    onFileSelected(event: any): void {
        // this.file = event.target.files[0];
        this.selectedFile = event.target.files[0];
    }
    
    uploadFile(): void {
        if (this.selectedFile != null) {

            let form_value = this.formJob.value;
            form_value.user_id = parseInt(this.cookieService.getToken('user_id')) ?? 1;
            console.log('formData', form_value);
        
            this.apiService.createJobPost({ job: form_value }).subscribe(
                res => {
                    console.log('job_post', res);
                    this.acceptJob(res.data.id);
                    this.addImage();
                },
                err => {
                    console.log('error: ', err);
                    this.showErrorViaToast('Unsuccessful creating new Job!');
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
            this.showSuccessViaToast('Successfully created new Job');
            location.reload();
          },
          (error) => {
            console.error(error);
            this.showErrorViaToast('Unsuccessful creating new Job!');
          }
        );
      }
    
    acceptJob(id) {
        this.apiService.acceptJobPost({ job_post_id: id}).subscribe(
            res => {
                console.log('job_post', res);
                this.showSuccessViaToast('Job Accepted!');
                location.reload();
            },
            err => {
                console.log('error: ', err);
                this.showErrorViaToast('Contact your administrator');
            }
        )
    }

    rejectJob(id) {
        this.apiService.rejectJobPost({ job_post_id: id}).subscribe(
            res => {
                console.log('job_post', res);
                this.showSuccessViaToast('Job Rejected!');
                location.reload();
            },
            err => {
                console.log('error: ', err);
                this.showErrorViaToast('Contact your administrator');
            }
        )
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
