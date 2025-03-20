import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

// This guard checks if the current profile is logged in or not
export const authGuard: CanActivateFn = (_route, _state) => {
  // Injecting the necessary dependencies
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.getUser()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
