import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentRoute!: string;
  showHeader: boolean = false;
  showSidenav: boolean = true;
  showMenu: boolean = false;

  constructor(private router: Router, private userService : KlijentService) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
      this.updateHeaderVisibility();
    });
  }

  updateHeaderVisibility() {
    if (this.currentRoute === '/login' || this.currentRoute === '/register') {
      this.showHeader = false;
    }
    else
      this.showHeader = true;
  }

  showPaddingMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.showMenu = false;
    this.userService.logout();
  }

}
