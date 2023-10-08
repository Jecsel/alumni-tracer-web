import { Component, OnInit } from "@angular/core";
import { SelectItem, MenuItem } from "primeng/api";
import { BreadcrumbService } from "../../app.breadcrumb.service";
import { Product } from "src/app/demo/domain/product";
import { ProductService } from "src/app/demo/service/productservice";
import { EventService } from "src/app/demo/service/eventservice";

@Component({
    templateUrl: "./dashboard.component.html",
    styleUrls: ["../../../assets/demo/badges.scss"],
    styles: [
        `
            @media screen and (max-width: 960px) {
                :host ::ng-deep .fc-header-toolbar {
                    display: flex;
                    flex-wrap: wrap;

                    .fc-dayGridMonth-button {
                        margin-top: 1rem;
                    }
                    .fc-timeGridWeek-button {
                        margin-top: 1rem;
                    }
                    .fc-timeGridDay-button {
                        margin-top: 1rem;
                    }
                }
            }
        `,
    ],
})
export class DashboardComponent implements OnInit {
    cities: SelectItem[];

    products: Product[];

    chartData: any;

    events: any[];

    selectedCity: any;

    items: MenuItem[];

    fullcalendarOptions: any;

    lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    constructor(
        private productService: ProductService,
        private eventService: EventService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Dashboard", routerLink: [""] },
        ]);
    }

    ngOnInit() {
        this.createChart();
        this.createDashboard();
    }

    createDashboard() {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));
        this.eventService.getEvents().then((events) => {
            this.events = events;
            this.fullcalendarOptions = {
                ...this.fullcalendarOptions,
                ...{ events: events },
            };
        });

        this.cities = [];
        this.cities.push({ label: "Select City", value: null });
        this.cities.push({
            label: "New York",
            value: { id: 1, name: "New York", code: "NY" },
        });
        this.cities.push({
            label: "Rome",
            value: { id: 2, name: "Rome", code: "RM" },
        });
        this.cities.push({
            label: "London",
            value: { id: 3, name: "London", code: "LDN" },
        });
        this.cities.push({
            label: "Istanbul",
            value: { id: 4, name: "Istanbul", code: "IST" },
        });
        this.cities.push({
            label: "Paris",
            value: { id: 5, name: "Paris", code: "PRS" },
        });

        this.chartData = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "#FFC107",
                },
                {
                    label: "Second Dataset",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: "#03A9F4",
                },
            ],
        };

        this.items = [
            { label: "Save", icon: "pi pi-fw pi-check" },
            { label: "Update", icon: "pi pi-fw pi-refresh" },
            { label: "Delete", icon: "pi pi-fw pi-trash" },
        ];

        this.fullcalendarOptions = {
            initialDate: "2021-02-01",
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
        };
    }

    createChart() {
        this.lineData = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: "rgb(255, 205, 86)",
                    borderColor: "rgb(255, 205, 86)",
                    tension: 0.4,
                },
                {
                    label: "Second Dataset",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.4,
                },
            ],
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#A0A7B5",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#A0A7B5",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#A0A7B5",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        this.barData = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: "My Second dataset",
                    backgroundColor: "rgb(54, 162, 235)",
                    borderColor: "rgb(54, 162, 235)",
                    data: [28, 48, 40, 19, 86, 27, 90],
                },
            ],
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#A0A7B5",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#A0A7B5",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#A0A7B5",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        this.pieData = {
            labels: ["A", "B", "C"],
            datasets: [
                {
                    data: [540, 325, 702, 421],
                    backgroundColor: [
                        "rgb(54, 162, 235)",
                        "rgb(255, 99, 132)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                    ],
                },
            ],
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#A0A7B5",
                    },
                },
            },
        };

        this.polarData = {
            datasets: [
                {
                    data: [11, 16, 7, 3],
                    backgroundColor: [
                        "rgb(54, 162, 235)",
                        "rgb(255, 99, 132)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                    ],
                    label: "My dataset",
                },
            ],
            labels: ["Blue", "Purple", "Orange", "Green"],
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#A0A7B5",
                    },
                },
            },
            scales: {
                r: {
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        this.radarData = {
            labels: [
                "Eating",
                "Drinking",
                "Sleeping",
                "Designing",
                "Coding",
                "Cycling",
                "Running",
            ],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgba(54, 162, 235,0.2)",
                    borderColor: "rgba(54, 162, 235,1)",
                    pointBackgroundColor: "rgba(54, 162, 235,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(54, 162, 235,1)",
                    data: [65, 59, 90, 81, 56, 55, 40],
                },
                {
                    label: "My Second dataset",
                    backgroundColor: "rgba(255, 99, 132,0.2)",
                    borderColor: "rgba(255, 99, 132,1)",
                    pointBackgroundColor: "rgba(255, 99, 132,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(255, 99, 132,1)",
                    data: [28, 48, 40, 19, 96, 27, 100],
                },
            ],
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#A0A7B5",
                    },
                },
            },
            scales: {
                r: {
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };
    }
}
