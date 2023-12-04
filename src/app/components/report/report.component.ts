import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  events: any;
  jobs: any;
  upcomingEvents: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllJobPost();
    this.getAllCurrentEvents();
    this.getAllUpcomingEvents();
  }

  getAllJobPost() {
    this.apiService.getAllJobPost().subscribe(
        res => {
            console.log('all Jobs: ', res.data);
            this.jobs = res.data;
            this.jobs = this.jobs.map(({ created_at, updated_at, image_url, id, active_date, qualification, status, is_active, ...rest }) => rest);
        },
        err => {
            console.log(err);
        }
    )
  }

  getAllCurrentEvents() {
    this.apiService.getCurrentEvents().subscribe(
      res => {
        console.log('all Events: ', res.data);
        this.events = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllUpcomingEvents() {
    this.apiService.getUpcomingEvents().subscribe(
      res => {
        console.log('all Events: ', res.data);
        this.upcomingEvents = res.data;
        this.upcomingEvents = this.upcomingEvents.map(({ created_at, updated_at, image_url, id, status, is_active, ...rest }) => rest);
      },
      err => {
        console.log(err);
      }
    )
  }

  generatePDF() {
    const doc = new jsPDF();

    // Add title
    doc.text('Job Posting Report', 20, 30);

    // Define columns and rows
    const columns = Object.keys(this.jobs[0]);
    const rows = this.jobs.map(item => Object.values(item));
    const capitalizedColumns = columns.map(column => column.charAt(0).toUpperCase() + column.slice(1));

    // Add table
    autoTable(doc, {  // Use autoTable from the imported module
      head: [capitalizedColumns],
      body: rows,
      startY: 35  // Adjust the starting position as needed
    });

    let firstTable_height = this.jobs.length * 10;
    // Add title for the second table
    doc.text('Upcomings Events Report', 20, firstTable_height + 40);

      // Define columns and rows for the second table
      const columns2 = Object.keys(this.upcomingEvents[0]);
      const rows2 = this.upcomingEvents.map(item => Object.values(item));
      const capitalizedColumns2 = columns2.map(columns2 => columns2.charAt(0).toUpperCase() + columns2.slice(1));
  
      // Add the second table below the first one
      autoTable(doc, {
        head: [capitalizedColumns2],
        body: rows2,
        startY: firstTable_height + 45  // Set startY below the first table with some padding
      });

    // Save the PDF
    doc.save('Alumni Tracer Report.pdf');
  }
}
