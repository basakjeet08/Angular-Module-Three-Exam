import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Incident } from 'src/app/shared/Models/Incidents/Incident';
import { IncidentStatus } from 'src/app/shared/Models/Incidents/Status';
import { IncidentService } from 'src/app/shared/services/incident.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
  animations: [staggerAnimation],
})
export class IncidentsComponent implements OnInit {
  // These are the data for the component
  incidentList: Incident[] = [];

  // This variable contains by what it should be categorized
  categories = [
    IncidentStatus.OPEN,
    IncidentStatus.IN_PROGRESS,
    IncidentStatus.CLOSED,
    'All',
  ];

  activeIndex = 0;

  // Injecting the necessary dependencies
  constructor(
    private incidentService: IncidentService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the incident list
  ngOnInit(): void {
    this.fetchIncidents();
  }

  // This function fetches all the incidents
  fetchIncidents() {
    // Setting the loading state
    this.loaderService.startLoading();
    const currentCategory = this.categories[this.activeIndex];

    // Calling the api
    this.incidentService.fetchIncidentByStatus(currentCategory).subscribe({
      // Success State
      next: (incidentList: Incident[]) => {
        this.loaderService.endLoading();

        // Showing the success toast
        this.toastService.showToast({
          type: 'success',
          message: 'Incidents fetched successfully !!',
        });

        this.incidentList = incidentList;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({
          type: 'error',
          message: error.message,
        });
      },
    });
  }

  // This function is invoked when the user clicks on the category cards
  onCategorySelect(index: number) {
    this.activeIndex = index;
    this.fetchIncidents();
  }

  // This function is invoked when the user clicks on the assign button
  onAssignClick(incidentId: string) {
    this.router.navigate(['../', 'assign'], {
      relativeTo: this.route,
      queryParams: {
        incidentId: incidentId,
      },
    });
  }
}
