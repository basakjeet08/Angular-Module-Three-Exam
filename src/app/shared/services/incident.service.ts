import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, INCIDENT_ENDPOINT } from '../constants/url-constants';
import { ProfileService } from './profile.service';
import { Incident } from '../Models/Incidents/Incident';
import { map } from 'rxjs';
import { mapFirebaseListResponse } from '../utils/firebase-object-mapper';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  // Storing the url and tokens
  private url = `${BASE_URL}/${INCIDENT_ENDPOINT}`;
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {
    // Storing the initial token
    this.token = profileService.getUser()?.token || 'Invalid Token';

    // Subscribing to upcoming user changes
    profileService
      .getUserSubject()
      .subscribe((user) => (this.token = user?.token || 'Invalid Token'));
  }

  // This function provides all the headers needed
  private getHeaders() {
    return {
      headers: new HttpHeaders({ Authorization: this.token }),
    };
  }

  // This function creates a new Incident for the user
  createIncident(incident: {
    title: string;
    priority: string;
    status: string;
  }) {
    const reportedById = this.profileService.getUser()?.id || 'Invalid Id';
    const reportedBy = this.profileService.getUser()?.name || 'Invalid Name';

    return this.http.post(
      `${this.url}.json`,
      { ...incident, reportedBy, reportedById },
      this.getHeaders()
    );
  }

  // This function fetches all the incidents for the user
  fetchIncidents() {
    return this.http
      .get<{ [key: string]: Incident }>(`${this.url}.json`)
      .pipe(map((response) => mapFirebaseListResponse(response)));
  }
}
