import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import {MessageService, ConfirmationService} from 'primeng/api';
import { ProductService } from 'src/app/demo/service/productservice';
import { ApiService } from 'src/app/services/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthCookieService } from 'src/app/services/auth/auth-cookie-service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [MessageService, ConfirmationService],
})

export class EventComponent implements OnInit {
  
    eventDialog: boolean;
    deleteEventDialog: boolean = false;
    deleteEventsDialog: boolean = false;
    event: any;
    selectedEvents: any;
    submitted: boolean;
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [5, 10, 20];
    events: any = [];
    selectedEvent: any;

    file: File = null;
    selectedFile: File | null = null;
    showViewDialog: boolean = false;


    formJob: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required]),
        venue: new FormControl('' , [Validators.required]),
        date: new FormControl('', Validators.required),
        time: new FormControl('' , [Validators.required]),
        sponsor: new FormControl('' , [Validators.required])
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
        this.getAllEventPosts();
    }

    viewJob(data){
        console.log('View Job', data);
        this.selectedEvent = data;
        this.showViewDialog = true;
        
    }

    showErrorViaToast(mess) {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: mess});
      }
    
    showSuccessViaToast(mess) {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: mess });
    }

    acceptEvent(id) {
        this.apiService.acceptEventPost({ job_post_id: id}).subscribe(
            res => {
                console.log('event_post', res);
                this.showSuccessViaToast('Event Accepted!');
                location.reload();
            },
            err => {
                console.log('error: ', err);
                this.showErrorViaToast('Contact your administrator');
            }
        )
    }

    rejectEvent(id) {
        this.apiService.rejectEventPost({ job_post_id: id}).subscribe(
            res => {
                console.log('event_post', res);
                this.showSuccessViaToast('Event Rejected!');
                location.reload();
            },
            err => {
                console.log('error: ', err);
                this.showErrorViaToast('Contact your administrator');
            }
        )
    }

    getAllEventPosts() {
        this.apiService.getAllEventPost().subscribe(
            res => {
                console.log('all Events: ', res.data);
                this.events = res.data;
            },
            err => {
                console.log(err);
            }
        )
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }
    
    uploadFile(): void {
        if (this.selectedFile != null) {

            let form_value = this.formJob.value;
            form_value.user_id = parseInt(this.cookieService.getToken('user_id')) ?? 1;
      
            console.log('formData', form_value);
        
            this.apiService.createEventPost({ event: form_value }).subscribe(
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
        this.apiService.updateEventPostImage(formData).subscribe(
          (response) => {
            console.log(response);
            this.showSuccessViaToast('Successfully created new Event');
            // Handle success
          },
          (error) => {
            console.error(error);
            this.showErrorViaToast('Unsuccessful creating new Event!');
            // Handle error
          }
        );
      }


    openNew() {
        this.event = {};
        this.submitted = false;
        this.eventDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteEventsDialog = true;
    }

    editEvent(event: any) {
        this.event = {...event};
        this.eventDialog = true;
    }

    deleteEvent(event: any) {
        this.deleteEventDialog = true;
        this.event = {...event};
    }

    confirmDeleteSelected(){
        this.deleteEventsDialog = false;
        this.events = this.events.filter(val => !this.selectedEvents.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedEvents = null;
    }

    confirmDelete(){
        this.deleteEventDialog = false;
        this.events = this.events.filter(val => val.id !== this.event.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Job Deleted', life: 3000});
        this.event = {};
    }

    hideDialog() {
        this.eventDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.event.name.trim()) {
            if (this.event.id) {
                // @ts-ignore
                this.event.inventoryStatus = this.event.inventoryStatus.value ? this.event.inventoryStatus.value: this.event.inventoryStatus;
                this.events[this.findIndexById(this.event.id)] = this.event;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Job Updated', life: 3000});
            } else {
                this.event.id = this.createId();
                this.event.code = this.createId();
                this.event.image = 'event-placeholder.svg';
                // @ts-ignore
                this.event.inventoryStatus = this.event.inventoryStatus ? this.event.inventoryStatus.value : 'INSTOCK';
                this.events.push(this.event);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Job Created', life: 3000});
            }

            this.events = [...this.events];
            this.eventDialog = false;
            this.event = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].id === id) {
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
