import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./reports.component.scss, ../../../../../assets/demo/badges.scss'],
  styles: [`
    :host ::ng-deep  .p-frozen-column {
        font-weight: bold;
    }

    :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
    }

    :host ::ng-deep .p-progressbar {
        height:.5rem;
    }
  `]
})
export class ReportsComponent implements OnInit {
  // @ViewChild('searchContent') searchContent: ElementRef;
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  loading:boolean = true;
  
  customers1: Customer[];
  joinedAlumniWork: any = [];

  cols: any[];
  _selectedColumns: any[];
  idFrozen: boolean = false;

  constructor(private customerService: CustomerService, private apiService: ApiService) { }

  ngOnInit(): void {
    // this.getCustomer();
    this.joinAlumniWork();

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


    this._selectedColumns = this.cols;
  }

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
  
  getCustomer (){
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;

      console.log('this.cusotmer1', this.customers1);
    });
  }

    joinAlumniWork() {
      this.apiService.joinAlumniWork().subscribe(
          (res) => {
              this.joinedAlumniWork = res.data;
              console.log('joinedAlumniWork', this.joinedAlumniWork);

          },
          (err) => {
              console.log(err);
          }
      );
  }

printContact(): void {

  let searchContent = document.getElementById('search-content');
  if (searchContent) {
    searchContent.style.display = 'none';
  }

  let filterIcon = document.getElementById('filter-icon-id');
  if (filterIcon) {
    filterIcon.style.display = 'none';
  }

  const printContent = document.getElementById('contact-table-id');

  
  if (printContent) {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Include the CSS styles
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach(style => {
        printWindow.document.head.appendChild(style.cloneNode(true));
      });

      // Write the content
      printWindow.document.write('<html><head><title>REGISTERED ALUMNI CONTACT DETAILS</title></head><body><br/><br/>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      
      // Close the document and print
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Unable to open a new window for printing.');
    }
  } else {
    console.error('Table not found.');
  }

  searchContent.style.display = '';
  filterIcon.style.display = '';
}

}
