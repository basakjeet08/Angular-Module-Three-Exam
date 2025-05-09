import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Injecting the necessary dependencies
  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router
  ) {}

  // This function is invoked when the user clicks on the logout button
  onLogoutClick() {
    this.profileService.logout();

    // Showing the toast
    this.toastService.showToast({
      type: 'success',
      message: 'User logged out successfully !!',
    });

    this.router.navigate(['/auth']);
  }
}
