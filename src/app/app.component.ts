import { Component } from '@angular/core';
import { AuthenticationService } from './core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moviedemo';
  isLoggedIn: boolean = false;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(result => this.isLoggedIn = this.authenticationService.isLoggedIn());
  }
}
