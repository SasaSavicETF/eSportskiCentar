import { CanActivateFn } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { inject } from '@angular/core';

export const upravnikGuard: CanActivateFn = (route, state) => {
  const userService = inject(KlijentService);

  if (userService.activeUser != null && userService.activeUser.role === 'upravnik')
      return true;
  else{
      userService.logout();
      return false;
  }
};
