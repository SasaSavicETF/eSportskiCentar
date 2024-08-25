import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentRoute!: string;
  showHeader: boolean = false;
  showSidenav: boolean = false;
  showMenu: boolean = false;
  showHideButton: boolean = false;

  constructor(private router: Router, private userService : KlijentService, @Inject(PLATFORM_ID) private platformId: Object) {}

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
      this.showSidenav = false;
    }
    else{
      this.showHeader = true;
      //this.showSidenav = true;
      if (isPlatformBrowser(this.platformId))
        this.onResize();
    }
  }

  showPaddingMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.showMenu = false;
    this.userService.logout();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.currentRoute !== '/login' && this.currentRoute !== '/register'
                && window.innerWidth > 768) // Show if width is greater than 768px
              this.showSidenav = true;
    else
      this.showSidenav = false;
  }

  toggleSidenav() {
    if (window.innerWidth < 768){
      this.showSidenav = !this.showSidenav; 
      this.showHideButton = !this.showHideButton;
    }
}

}
