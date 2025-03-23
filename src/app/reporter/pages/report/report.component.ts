import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { scaleUpAnimation } from 'src/app/shared/animations/scale-up-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Incident } from 'src/app/shared/Models/Incidents/Incident';
import { IncidentService } from 'src/app/shared/services/incident.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  animations: [scaleUpAnimation],
})
export class ReportComponent implements OnInit {
  // This is the user data for the component
  userInput = {
    id: '',
    title: '',
    priority: 'LOW',
    reportedBy: '',
    status: 'OPEN',
    comment: '',
  };
  isEditMode: boolean = false;

  // Injecting the required dependencies
  constructor(
    private incidentService: IncidentService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // Checking if this is edit mode or add mode
  ngOnInit(): void {
    const incidentId = this.route.snapshot.queryParams['incidentId'];

    if (incidentId) {
      this.isEditMode = true;
      this.userInput.id = incidentId;
      this.fetchIncidentDetails(incidentId);
    }
  }

  // This function fetches the incident Details
  fetchIncidentDetails(incidentId: string) {
    // Stating the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.incidentService.fetchIncidentById(incidentId).subscribe({
      // Success State
      next: (incident: Incident | null) => {
        this.loaderService.endLoading();

        if (!incident) {
          this.toastService.showToast({
            type: 'error',
            message: 'Wrong Incident Id Provided !!',
          });

          this.location.back();
        } else {
          this.userInput.priority = incident.priority;
          this.userInput.reportedBy = incident.reportedBy;
          this.userInput.status = incident.status;
          this.userInput.title = incident.title;
          this.userInput.comment = incident.comment;
        }
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    const observable = this.isEditMode
      ? this.incidentService.updateIncident(this.userInput)
      : this.incidentService.createIncident(this.userInput);

    // Calling the API
    observable.subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        // Showing the success toast
        this.toastService.showToast({
          type: 'success',
          message: 'Incident is reported successfully !!',
        });

        this.location.back();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the cancel button
  onCancelClick() {
    this.location.back();
  }
}
