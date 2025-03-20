import { Component, Input } from '@angular/core';
import { Incident } from '../../Models/Incidents/Incident';

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styleUrls: ['./incident-card.component.css'],
})
export class IncidentCardComponent {
  @Input('incident') incident: Incident | null = null;
}
