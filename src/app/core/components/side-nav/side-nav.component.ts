import { AfterViewInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';
import { User } from '../../models/User';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, AfterViewInit {

  navigation = [
    { link: 'dashboard', label: 'Movie Dashboard', icon: 'movie' },
    { link: 'favourites', label: 'My Favourites', icon: 'star' }
    // { link: 'examples', label: 'Forum' }
  ];

  navigationSideMenu = [
    ...this.navigation
  ];

  stickyHeader$!: Observable<boolean>;
  theme$!: Observable<string>;
  firstLogin: boolean = true;
  currentUser: User = new User();

  @ViewChild('sidemenu', { static: false }) sideMenu!: MatSidenav;

  constructor(private sideNavService: SideNavService, private authenticationService: AuthenticationService) {
    
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => {
      if (this.sideMenu && (!this.currentUser || !this.currentUser.id) && user && user.id) {
        this.sideNavService.openSideMenu();
      } else if (this.sideMenu && (!user || !user.id)) {
        this.sideNavService.closeSideMenu();
      }
      this.currentUser = user;
    })
  }

  ngAfterViewInit() {
    this.sideNavService.setSideMenu(this.sideMenu);
  }

}