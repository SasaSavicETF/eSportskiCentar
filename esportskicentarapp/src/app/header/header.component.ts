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
  showUserIcon: boolean = false;
  showHideButton: boolean = false;
  showDodavanjeDogadjaja: boolean = false;
  showPregledDogadjaja: boolean = false;
  showOdabirDogadjaja: boolean = false;
  showTurnir: boolean = false;
  showSlanjeZadatka: boolean = false;
  showZadatak: boolean = false;
  showCjenovnik: boolean = false;
  showGrad: boolean = false;
  showInventar: boolean = false;
  showRaspored: boolean = false;
  showDnevniRaspored: boolean = false;
  showDvorana: boolean = false;
  showSport: boolean = false;
  showUlaz: boolean = false;
  showSvlacionica: boolean = false;
  showEkipa: boolean = false;
  showTeren: boolean = false;
  showTipterena: boolean = false;
  showAdministracija: boolean = false;
  showAdminPanel: boolean = false;

  constructor(private router: Router, private userService : KlijentService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
      this.updateHeaderVisibility();
      this.updateLinkVisibility();
    });
  }

  updateHeaderVisibility() {
    if (this.currentRoute === '/login' || this.currentRoute === '/register') {
      this.showHeader = false;
      this.showSidenav = false;
      this.showUserIcon = false;
    }
    else if(this.currentRoute === '/index')
    {
      this.showHeader = false;
      this.showSidenav = false;
      this.showUserIcon = false;
    }
    else{
      this.showHeader = true;
      this.showUserIcon = true;
      if (isPlatformBrowser(this.platformId))
        this.onResize();
    }
  }

  updateLinkVisibility(){
    if (this.showSidenav){
      this.resetLinkVisibility();
      if (this.userService.activeUser?.role === 'user'){
        this.showDodavanjeDogadjaja = true;
        this.showPregledDogadjaja = true;
      }
      else if (this.userService.activeUser?.role === 'radnik'){
        this.showZadatak = true;
      }
      else if (this.userService.activeUser?.role === 'upravnik'){
        this.showDodavanjeDogadjaja = true;
        this.showPregledDogadjaja = true;
        this.showOdabirDogadjaja = true;
        this.showTurnir = true;
        this.showSlanjeZadatka = true;
        this.showCjenovnik = true;
        this.showInventar = true;
        this.showRaspored = true;
        this.showDnevniRaspored = true;
        this.showUlaz = true;
        this.showSvlacionica = true;
        this.showTeren = true; 
      }
      else {
        this.showDodavanjeDogadjaja = true;
        this.showTurnir = true;
        this.showRaspored = true;
        this.showDnevniRaspored = true;
        this.showGrad = true;
        this.showDvorana = true;
        this.showSport = true;
        this.showUlaz = true;
        this.showSvlacionica = true;
        this.showEkipa = true;
        this.showTeren = true; 
        this.showTipterena = true;
        this.showAdministracija = true;
        this.showAdminPanel = true;
      }
    }
  }

  resetLinkVisibility(){
    this.showDodavanjeDogadjaja = false;
    this.showPregledDogadjaja = false;
    this.showOdabirDogadjaja = false;
    this.showTurnir = false;
    this.showSlanjeZadatka = false;
    this.showZadatak = false;
    this.showCjenovnik = false;
    this.showGrad = false;
    this.showInventar = false;
    this.showRaspored = false;
    this.showDnevniRaspored = false;
    this.showDvorana = false;
    this.showSport = false;
    this.showUlaz = false;
    this.showSvlacionica = false;
    this.showEkipa = false;
    this.showTeren = false;
    this.showTipterena = false;
    this.showAdministracija = false;
    this.showAdminPanel = false;
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
    if (this.currentRoute !== '/login' && this.currentRoute !== '/register' && this.currentRoute !== '/index'
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
