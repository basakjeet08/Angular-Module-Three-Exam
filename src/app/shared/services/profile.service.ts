import { Injectable } from '@angular/core';
import { User } from '../Models/User/User';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  // Current user logged profile tokens
  private USER_DATA_TOKEN = 'USER_DATA';

  // Current Profile user subjects and user objects
  private user: User | undefined = undefined;
  private userSubject = new Subject<User | undefined>();

  // Injecting the necessary dependencies
  constructor() {
    this.user = this.getUserFromLocal();
    this.userSubject.next(this.getUser());
  }

  // This function returns the current user data
  getUser(): User | undefined {
    return this.user ? { ...this.user } : undefined;
  }

  // This function returns a readonly user subject
  getUserSubject() {
    return this.userSubject.asObservable();
  }

  // This function gets the user data from the local storage
  getUserFromLocal(): User | undefined {
    const data = localStorage.getItem(this.USER_DATA_TOKEN);
    return data ? JSON.parse(data) : undefined;
  }

  // This function sets the user to the local storage
  setUserToLocal(user: User) {
    this.user = user;
    this.userSubject.next(this.getUser());

    localStorage.setItem(this.USER_DATA_TOKEN, JSON.stringify(user));
  }

  // This function logs out the user
  logout() {
    this.user = undefined;
    this.userSubject.next(this.getUser());
    localStorage.removeItem(this.USER_DATA_TOKEN);
  }
}
