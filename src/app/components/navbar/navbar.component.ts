import {Location} from '@angular/common';
import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../pages/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  focus: any = {};
  listTitles: any[] = [];
  location: Location;
  sidenavOpen: boolean = true;
  @Input()
  navItems: any[] = [];

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private  authService:  AuthService,
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = this.navItems.filter(listTitle => listTitle);
  }

  logOut() {
    this.authService.SignOut();
  }

  openSearch() {
    document.body.classList.add('g-navbar-search-showing');
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-showing');
      document.body.classList.add('g-navbar-search-show');
    }, 150);
    setTimeout(function () {
      document.body.classList.add('g-navbar-search-shown');
    }, 300);
  }

  closeSearch() {
    document.body.classList.remove('g-navbar-search-shown');
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-show');
      document.body.classList.add('g-navbar-search-hiding');
    }, 150);
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-hiding');
      document.body.classList.add('g-navbar-search-hidden');
    }, 300);
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-hidden');
    }, 500);
  }

  openSidebar() {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
      this.sidenavOpen = false;
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
      this.sidenavOpen = true;
    }
  }

  toggleSidenav() {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
      this.sidenavOpen = false;
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
      this.sidenavOpen = true;
    }
  }
}
