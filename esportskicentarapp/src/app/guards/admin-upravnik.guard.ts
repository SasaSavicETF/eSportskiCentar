import { CanActivateFn, Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { inject } from '@angular/core';

export const adminUpravnikGuard: CanActivateFn = (route, state) => {
  const userService = inject(KlijentService);
  const router = inject(Router);

  if (userService.activeUser != null && userService.checkExpiry() && (userService.activeUser.role === 'upravnik' 
                                || userService.activeUser.role === 'admin'))
      return true;
  else{
    userService.logout();
    router.navigate(['/index']);
    return false;
  }
};
