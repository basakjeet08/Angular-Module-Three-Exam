import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthResponse } from '../Models/Auth/AuthResponse';
import {
  BASE_URL,
  FIREBASE_SIGN_IN_URL,
  FIREBASE_SIGN_UP_URL,
  USER_ENDPOINT,
} from '../constants/url-constants';
import { map, switchMap, tap } from 'rxjs';
import { User } from '../Models/User/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  // This function registers the current user
  registerUser(user: {
    name: string;
    email: string;
    role: string;
    password: string;
  }) {
    return this.http
      .post<AuthResponse>(FIREBASE_SIGN_UP_URL, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        switchMap((response) => this.storeUser(response, user.name, user.role))
      );
  }

  // This function stores the user data in the realtime database
  storeUser(authResponse: AuthResponse, name: string, role: string) {
    const userId = authResponse.localId;
    const token = authResponse.idToken;

    return this.http.put(
      `${BASE_URL}/${USER_ENDPOINT}/${userId}.json?auth=${token}`,
      {
        id: userId,
        name: name,
        email: authResponse.email,
        role: role,
      }
    );
  }

  // Login User to the firebase auth
  loginUser(user: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(FIREBASE_SIGN_IN_URL, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(switchMap((response) => this.fetchUserData(response)));
  }

  // This function fetches the logged in user details from the firebase realtime database
  fetchUserData(authResponse: AuthResponse) {
    const userId = authResponse.localId;
    const token = authResponse.idToken;

    return this.http
      .get<User>(`${BASE_URL}/${USER_ENDPOINT}/${userId}.json?auth=${token}`)
      .pipe(
        map((user) => {
          return { ...user, token, refreshToken: authResponse.refreshToken };
        }),
        tap((user: User) => this.profileService.setUserToLocal(user))
      );
  }
}
