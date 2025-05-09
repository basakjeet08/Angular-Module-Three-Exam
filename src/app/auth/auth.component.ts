import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scaleUpAnimation } from '../shared/animations/scale-up-animation';
import { slideRightAnimation } from '../shared/animations/slide-right-animation';
import { slideLeftAnimation } from '../shared/animations/slide-left-animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [scaleUpAnimation, slideRightAnimation, slideLeftAnimation],
})
export class AuthComponent {
  // These are the details inputted by the user
  isLoginMode: boolean = true;
  userInput = { email: '', password: '', confirmPassword: '' };

  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is called when the user wants to toggle login or register
  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // This function is invoked when the user registration is successful
  onRegistrationSuccess() {
    this.isLoginMode = true;
  }

  // This function is invoked when the user login is successfull
  onLoginSuccess(role: string) {
    this.router.navigate(['../', role], { relativeTo: this.route });
  }
}
