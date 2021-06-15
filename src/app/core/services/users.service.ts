import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri: string = environment.movieAPIURI;

  currentUser: User = new User();
  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(
      (userData) => {
        if (this.authenticationService.isLoggedIn()) {
          this.currentUser = this.authenticationService.currentUserValue || new User();
        }
      }
   );
  }


  createUser(email: string, name: string, password: string) {
    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.password = password;

    return this.http.post<User>(this.uri+"users", newUser)
    .pipe(map(result => {
      this.authenticationService.updateLoggedInUser(result);
    }));
  }

  
}
