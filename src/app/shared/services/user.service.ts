import { Injectable } from '@angular/core';
import { BASE_URL, USER_ENDPOINT } from '../constants/url-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { User } from '../Models/User/User';
import { mapFirebaseListResponse } from '../utils/firebase-object-mapper';
import { map } from 'rxjs';
import { Role } from '../Models/User/Role';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Storing the url and tokens
  private url = `${BASE_URL}/${USER_ENDPOINT}`;
  private token: string;

  // Injecting the necessary dependencies
  constructor(private http: HttpClient, profileService: ProfileService) {
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

  // This function fetches all the incidents for the user
  fetchReporters() {
    return this.http
      .get<{ [key: string]: User }>(`${this.url}.json`, this.getHeaders())
      .pipe(
        map((response) => mapFirebaseListResponse(response)),
        map((userList) =>
          userList.filter((user) => user.role === Role.REPORTER)
        )
      );
  }
}
