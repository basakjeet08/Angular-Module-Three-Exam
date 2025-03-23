import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Incident } from 'src/app/shared/Models/Incidents/Incident';
import { IncidentService } from 'src/app/shared/services/incident.service';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css'],
  animations: [staggerAnimation],
})
export class AssignedComponent implements OnInit {
  // These are the data for the component
  incidentList: Incident[] = [];

  // Injecting the necessary dependencies
  constructor(
    private incidentService: IncidentService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the user's incident List
  ngOnInit(): void {
    this.fetchIncidents();
  }

  // This function fetches all the incidents of the current user
  fetchIncidents() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api
    this.incidentService.fetchIncidentsAssignedToCurrentUser().subscribe({
      // Success State
      next: (incidentList: Incident[]) => {
        this.loaderService.endLoading();
        this.incidentList = incidentList;

        if (incidentList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: 'There are no incidents reported !!',
          });
        }
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the update button
  onUpdateClick(incidentId: string) {
    this.router.navigate(['../', 'report'], {
      relativeTo: this.route,
      queryParams: { incidentId },
    });
  }
}
