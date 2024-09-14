import { CanActivateFn, Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(KlijentService);
  const router = inject(Router);

  if (userService.activeUser != null && userService.activeUser.role === 'admin')
      return true;
  else{
      userService.logout();
      router.navigate(['/index']);
      return false;
  }
};
