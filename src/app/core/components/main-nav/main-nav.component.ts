import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';
import { LoginDialogComponent } from '../../authentication/login/login-dialog.component';
import { RegisterDialogComponent } from '../../authentication/register/register-dialog.component';
import { User } from '../../models/User';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  @Input() public isActivated: boolean = false;

  currentUser!: User;
  loggedIn: boolean = false;

  //stickyHeader$: Observable<boolean> = false;

  constructor(public dialog: MatDialog,
    private sideNavService: SideNavService,
    private authenticationService: AuthenticationService,
    private router: Router
    // private userService: UserService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
       (userData) => {
         this.currentUser = userData;
         this.loggedIn = this.authenticationService.isLoggedIn();
       }
    );
  }

  toggleSideMenu(): void {
    this.sideNavService.toggleSideMenu();
  }

  onClickLogin() {
    this.dialog.open(LoginDialogComponent, {
    });
  }

  onClickLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  onClickRegister() {
    this.dialog.open(RegisterDialogComponent, {
    });
  }

}