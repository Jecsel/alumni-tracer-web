import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class UserJobComponent implements OnInit {
  sortField: string;
  sortOptions: SelectItem[];
  sortOrder: number;
  jobs: any = [];
  activeJobs: any = [];
  selectedFile: File | null = null;
  jobDialog: boolean;
  job: any;
  submitted: boolean;

  showViewJobDialog: boolean = false;
  showViewMyJobDialog: boolean = false;
  selectedJob: any;
  selectedMyJob: any;

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

  constructor(private apiService: ApiService, private messageService: MessageService,
    private cookieService: AuthCookieService) { }

  ngOnInit(): void {
    this.getAllUserJobPosts();
    this.getAllActiveJobs();
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

  viewJob(data) {
    console.log('View Job', data);
    this.selectedJob = data;
    this.showViewJobDialog = true;
  }

  viewMyJob(data) {
    console.log('View Job', data);
    this.selectedMyJob = data;
    this.showViewMyJobDialog = true;
  }

  showErrorViaToast(mess) {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: mess});
  }

  showSuccessViaToast(mess) {
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: mess });
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
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

  openNew() {
    this.job = {};
    this.submitted = false;
    this.jobDialog = true;
  }

  editProduct(job: any) {
    this.job = {...job};
    this.jobDialog = true;
  }

  hideDialog() {
    this.jobDialog = false;
    this.submitted = false;
}

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  onFileSelected(event: any): void {
    // this.file = event.target.files[0];
    this.selectedFile = event.target.files[0];
  }

  getAllUserJobPosts() {
    var usr_id = this.cookieService.getToken('user_id');

    this.apiService.getAllUserJobPosts({ user_id: usr_id}).subscribe(
        res => {
            console.log('all Jobs: ', res.data);
            this.jobs = res.data;
        },
        err => {
            console.log(err);
        }
    )
  }

  getAllActiveJobs() {
    this.apiService.getAllActiveApproveJobs().subscribe(
        res => {
            console.log('all Jobs: ', res.data);
            this.activeJobs = res.data;
        },
        err => {
            console.log(err);
        }
    )
  }

  uploadFile(): void {
    if (this.selectedFile != null) {

        let form_value = this.formJob.value;
        form_value.user_id = parseInt(this.cookieService.getToken('user_id')) ?? 1;
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
        this.showSuccessViaToast('Job Created!');
        location.reload();
      },
      (error) => {
        console.error(error);
        this.showErrorViaToast('Please Contact Admin')
      }
    );
  }

}