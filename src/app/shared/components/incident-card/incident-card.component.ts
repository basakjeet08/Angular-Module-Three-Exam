import { Component, Input } from '@angular/core';
import { Incident } from '../../Models/Incidents/Incident';
import { IncidentPriority } from '../../Models/Incidents/Priority';

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styleUrls: ['./incident-card.component.css'],
})
export class IncidentCardComponent {
  @Input('incident') incident: Incident | null = null;

  get incidentPriority() {
    if (this.incident?.priority === IncidentPriority.HIGH) {
      return 'HIGH';
    } else if (this.incident?.priority === IncidentPriority.MEDIUM) {
      return 'MEDIUM';
    } else if (this.incident?.priority === IncidentPriority.LOW) {
      return 'LOW';
    }

    return '';
  }
}
