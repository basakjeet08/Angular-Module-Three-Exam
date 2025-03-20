import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks on the view Incident List component
  onIncidentPageClick() {
    this.router.navigate(['../', 'incidents'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the report incident component
  onReportIncidentClick() {
    this.router.navigate(['../', 'report'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the assigned incidents button
  onCheckAssignedIncidentsClick() {
    this.router.navigate(['../', 'assigned'], { relativeTo: this.route });
  }
}
