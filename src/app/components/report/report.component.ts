import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SelectItem } from 'primeng/api';

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit {
    events: any;
    jobs: any;
    upcomingEvents: any;
    valCheck: any;
    products: any;
    account: any;
    productDialog: boolean;
    cols: any[];

    deleteProductsDialog: boolean = false;
    deleteProductDialog: boolean = false;

    groupByBatch: any;
    perBatch: any;
    groupByWorkType: any;
    perWorkType: any;

    chckAll: boolean = true;
    chckReg: boolean = true;
    chckWorkType: boolean = true;
    chckEvent: boolean = true;
    chckJob: boolean = true;

    selectType: SelectItem;
    selectBatchYear: SelectItem;
    listBatchYear = [
        { label: "2023", value: "2023" },
        { label: "2022", value: "2022" },
        { label: "2021", value: "2021" },
        { label: "2020", value: "2020" },
    ];


    cities = [
        { label: "New York", value: { id: 1, name: "New York", code: "NY" } },
        { label: "Rome", value: { id: 2, name: "Rome", code: "RM" } },
        { label: "London", value: { id: 3, name: "London", code: "LDN" } },
        { label: "Istanbul", value: { id: 4, name: "Istanbul", code: "IST" } },
        { label: "Paris", value: { id: 5, name: "Paris", code: "PRS" } },
    ];

    workingType = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ];

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.getAllJobPost();
        this.getAllCurrentEvents();
        this.getAllUpcomingEvents();
        this.alumniGroupByBatch();

        this.alumniGroupByWorkType();
        this.batchYearList();
    }

    selectChckAll() {
        this.chckReg = this.chckAll;
        this.chckWorkType = this.chckAll;
        this.chckEvent = this.chckAll;
        this.chckJob = this.chckAll;
    }

    selectReg() {
        this.chckAll = false;
        this.chckReg = this.chckReg;
    }

    selectWorkType() {
        this.chckAll = false;
        this.chckWorkType = this.chckWorkType;
    }

    selectEvent() {
        this.chckAll = false;
        this.chckEvent = this.chckEvent;
    }

    selectJob() {
        this.chckAll = false;
        this.chckJob = this.chckJob;
    }

    batchYearList() {
        this.apiService.batchYearList().subscribe((res) => {
            console.log("all batchYearList: ", res.data);
            this.listBatchYear = res.data;
        });
    }

    alumniGroupByBatch() {
        this.apiService.alumniGroupByBatch().subscribe((res) => {
            console.log("all alumniGroupByBatch: ", res.data);
            this.groupByBatch = res.data;
        });
    }

    alumniPerBatch(val) {
        this.apiService.alumniPerBatch({ batch_year: val }).subscribe(
            (res) => {
                console.log("all alumniPerBatch: ", res.data);
                this.perBatch = res.data;

                this.createReportPerBatch();
            },
            (err) => {
                console.log(err);
            }
        );
    }

    createReportPerBatch() {
        let doc = new jsPDF();
        doc.text(
            "List of Alumni Batch of " + this.perBatch[0].batch_year,
            20,
            30
        );

        this.perBatch = this.perBatch.map(
            ({
                created_at,
                updated_at,
                area_of_business,
                business_acronym,
                business_address,
                business_name,
                business_related,
                civil_status,
                company_acronym,
                company_name,
                dob,
                gender,
                id,
                is_working,
                line_of_busines,
                middle_name,
                province,
                region,
                type_of_business,
                user_id,
                work_position,
                work_type,
                barangay,
                age,
                course,
                batch_year,
                company_address,
                ...rest
            }) => rest
        );

        const columns3 = Object.keys(this.perBatch[0]);
        const rows3 = this.perBatch.map((item) => Object.values(item));
        const capitalizedColumns3 = columns3.map(
            (columns3) => columns3.charAt(0).toUpperCase() + columns3.slice(1)
        );

        autoTable(doc, {
            head: [capitalizedColumns3],
            body: rows3,
            startY: 35,
        });
        doc.save(
            "List of Alumni Batch of " + this.perBatch[0].batch_year + ".pdf"
        );
    }

    alumniGroupByWorkType() {
        this.apiService.alumniGroupByWorkType().subscribe(
            (res) => {
                console.log("all alumniGroupByWorkType: ", res.data);
                this.groupByWorkType = res.data;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    alumniPerWorkType(val) {
        this.apiService.alumniPerWorkType({ is_working: val }).subscribe(
            (res) => {
                console.log("all alumniPerWorkType: ", res.data);
                this.perWorkType = res.data;

              this.createReportWorkType();
            },
            (err) => {
                console.log(err);
            }
        );
    }

    createReportWorkType(){
      let doc = new jsPDF();

      console.log(this.selectType);

      let title = this.selectType.value == 'yes' ?  'List of Employed Alumni' : 'List of Unemployed Alumni';
      doc.text(
        title,
        20,
        30
    );

    this.perWorkType = this.perWorkType.map(
        ({
            created_at,
            updated_at,
            area_of_business,
            business_acronym,
            business_address,
            business_name,
            business_related,
            civil_status,
            company_acronym,
            company_name,
            dob,
            gender,
            id,
            is_working,
            line_of_busines,
            middle_name,
            province,
            region,
            type_of_business,
            user_id,
            work_position,
            work_type,
            barangay,
            age,
            course,
            batch_year,
            company_address,
            ...rest
        }) => rest
    );

    const columns4 = Object.keys(this.perBatch[0]);
    const rows4 = this.perBatch.map((item) => Object.values(item));
    const capitalizedColumns4 = columns4.map(
        (columns4) =>
            columns4.charAt(0).toUpperCase() + columns4.slice(1)
    );

    autoTable(doc, {
        head: [capitalizedColumns4],
        body: rows4,
        startY: 35,
    });
    doc.save(
        "List of Alumni Batch of " +
            this.perBatch[0].batch_year +
            ".pdf"
    );
    }

    getAllJobPost() {
        this.apiService.getAllJobPost().subscribe(
            (res) => {
                console.log("all Jobs: ", res.data);
                this.jobs = res.data;
                this.jobs = this.jobs.map(
                    ({
                        created_at,
                        updated_at,
                        image_url,
                        id,
                        active_date,
                        qualification,
                        status,
                        is_active,
                        ...rest
                    }) => rest
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getAllCurrentEvents() {
        this.apiService.getCurrentEvents().subscribe(
            (res) => {
                console.log("all Events: ", res.data);
                this.events = res.data;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getAllUpcomingEvents() {
        this.apiService.getUpcomingEvents().subscribe(
            (res) => {
                console.log("all getUpcomingEvents: ", res.data);
                this.upcomingEvents = res.data;
                this.upcomingEvents = this.upcomingEvents.map(
                    ({
                        created_at,
                        updated_at,
                        image_url,
                        id,
                        status,
                        is_active,
                        ...rest
                    }) => rest
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }

    generateReport() {
        let doc = new jsPDF();
        let lastHeight = 0;

        if (this.chckAll || this.chckJob) {
            // First Table
            doc.text("Job Posting Report", 20, 30);

            const columns = Object.keys(this.jobs[0]);
            const rows = this.jobs.map((item) => Object.values(item));
            const capitalizedColumns = columns.map(
                (column) => column.charAt(0).toUpperCase() + column.slice(1)
            );

            autoTable(doc, {
                head: [capitalizedColumns],
                body: rows,
                startY: 35,
            });

            doc.save("Job Posting Report.pdf");
        }

        if (this.chckAll || this.chckEvent) {
            //Second Table
            doc = new jsPDF();
            doc.text("Upcomings Events Report", 20, 30);

            const columns2 = Object.keys(this.upcomingEvents[0]);
            const rows2 = this.upcomingEvents.map((item) =>
                Object.values(item)
            );
            const capitalizedColumns2 = columns2.map(
                (columns2) =>
                    columns2.charAt(0).toUpperCase() + columns2.slice(1)
            );

            autoTable(doc, {
                head: [capitalizedColumns2],
                body: rows2,
                startY: 35,
            });

            doc.save("Upcomings Events Report.pdf");
        }

        if (this.selectBatchYear) {
            this.alumniPerBatch(this.selectBatchYear);
        } else {
            if (this.chckAll || this.chckReg) {
                for (const batchYear in this.groupByBatch) {
                    console.log(`\nBatch Year: ${batchYear}`);
                    doc = new jsPDF();
                    let title =
                        "List of Alumni Batch of " +
                        this.groupByBatch[batchYear][0].batch_year;
                    doc.text(title, 20, 30);

                    let groupBatch = this.groupByBatch[batchYear].map(
                        ({
                            created_at,
                            updated_at,
                            area_of_business,
                            business_acronym,
                            business_address,
                            business_name,
                            business_related,
                            civil_status,
                            company_acronym,
                            company_name,
                            dob,
                            gender,
                            id,
                            is_working,
                            line_of_busines,
                            middle_name,
                            province,
                            region,
                            type_of_business,
                            user_id,
                            work_position,
                            work_type,
                            barangay,
                            age,
                            course,
                            batch_year,
                            company_address,
                            ...rest
                        }) => rest
                    );

                    const columns3 = Object.keys(groupBatch[0]);
                    const rows3 = groupBatch.map((item) => Object.values(item));
                    const capitalizedColumns3 = columns3.map(
                        (columns3) =>
                            columns3.charAt(0).toUpperCase() + columns3.slice(1)
                    );

                    autoTable(doc, {
                        head: [capitalizedColumns3],
                        body: rows3,
                        startY: 40,
                    });

                    doc.save(title + ".pdf");
                }
            }
        }

        if (this.selectType) {
            this.alumniPerWorkType(this.selectType);
        } else {
            if (this.chckAll || this.chckWorkType) {
                for (const workType in this.groupByWorkType) {
                    console.log(`\nBatch Year: ${workType}`);
                    doc = new jsPDF();
                    lastHeight =
                        lastHeight +
                        this.groupByWorkType[workType].length * 10 +
                        5;
                    let title =
                        workType == "yes"
                            ? "List of Employed Alumni"
                            : "List of Unemployed Alumni";
                    doc.text(title, 20, 35);

                    let groupBatch = this.groupByWorkType[workType].map(
                        ({
                            created_at,
                            updated_at,
                            area_of_business,
                            business_acronym,
                            business_address,
                            business_name,
                            business_related,
                            civil_status,
                            company_acronym,
                            company_name,
                            dob,
                            gender,
                            id,
                            is_working,
                            line_of_busines,
                            middle_name,
                            province,
                            region,
                            type_of_business,
                            user_id,
                            work_position,
                            work_type,
                            barangay,
                            age,
                            course,
                            batch_year,
                            company_address,
                            ...rest
                        }) => rest
                    );

                    const columns4 = Object.keys(groupBatch[0]);
                    const rows4 = groupBatch.map((item) => Object.values(item));
                    const capitalizedColumns4 = columns4.map(
                        (columns4) =>
                            columns4.charAt(0).toUpperCase() + columns4.slice(1)
                    );

                    autoTable(doc, {
                        head: [capitalizedColumns4],
                        body: rows4,
                        startY: 40,
                    });
                    doc.save(title + ".pdf");
                }
            }
        }

        //Fourth Table
        // lastHeight = (lastHeight + (this.perBatch.length * 10)) + 5;
        // doc.text("List of Alumni Batch of " + this.perWorkType[0].batch_year + 'Per Work Type', 20, lastHeight + 20);
        // lastHeight = lastHeight + 20;

        // this.perWorkType = this.perWorkType.map(({ created_at, updated_at, area_of_business, business_acronym,
        //   business_address, business_name, business_related, civil_status, company_acronym,
        //   company_name, dob, gender, id, is_working, line_of_busines, middle_name, province, region, type_of_business, user_id,
        //   work_position, work_type, barangay, age, course, batch_year,
        //   company_address, ...rest }) => rest);

        // const columns4 = Object.keys(this.perBatch[0]);
        // const rows4 = this.perBatch.map((item) => Object.values(item));
        // const capitalizedColumns4 = columns4.map(
        //     (columns4) => columns4.charAt(0).toUpperCase() + columns4.slice(1)
        // );

        // autoTable(doc, {
        //     head: [capitalizedColumns4],
        //     body: rows4,
        //     startY: lastHeight + 5,
        // });

        // Save the PDF
        // doc.save("Alumni Tracer Report.pdf");
    }
}
