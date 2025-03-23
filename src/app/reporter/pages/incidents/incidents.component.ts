import { Component, OnInit } from '@angular/core';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Incident } from 'src/app/shared/Models/Incidents/Incident';
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

  // Injecting the necessary dependencies
  constructor(
    private incidentService: IncidentService,
    private toastService: ToastService,
    private loaderService: LoaderService
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
    this.incidentService.fetchIncidentsAndFilterById().subscribe({
      // Success State
      next: (incidentList: Incident[]) => {
        this.loaderService.endLoading();

        // Showing the success toast
        this.toastService.showToast({
          type: 'success',
          message: 'Incidents fethed successfully !!',
        });

        this.incidentList = incidentList;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
