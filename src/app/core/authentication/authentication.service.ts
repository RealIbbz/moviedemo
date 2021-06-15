import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/User";
import { NotificationService } from "../services/notification-service";

const uri = environment.movieAPIURI;

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private token!: string;
  // store the URL so we can redirect after logging in
  /*redirectUrl: string;*/

  constructor(private http: HttpClient, private notificationService: NotificationService) {
   

    let user = null;
    const localData = localStorage.getItem("currentMovieUser");
    let localUserData;
    // check if the local data exists, if it does reverse the base 64 encoding.
    if (localData) {
      try {
        localUserData = JSON.parse(window.atob(localData));
        user = localUserData;
      } catch (e) {
        console.error('error parsing local data.');
        localUserData = null;
      }
    }

    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    if (this.isLoggedIn()) {
      return this.currentUserSubject.value;
    } else {
      return null;
    }
  }


  public getToken(): string | null {
    if (this.currentUserSubject && this.currentUserSubject.value) {
      return this.currentUserSubject.value.token;
    } else {
      return null;
    }
  }


  public isLoggedIn() {
    if (this.currentUserSubject && this.currentUserSubject.value && this.currentUserSubject.value.id) {
      return true;
    } else {
      return false;
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(uri+"login", {email, password})
      .pipe(map(user => {
        this.currentUserSubject.next(user);
        this.storeUser();
        return user;
      }));
  }

  

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentMovieUser");
    const newUser = new User();
    if (this.currentUserSubject) {
      this.currentUserSubject.next(newUser);
    }
    
  }


  // store user details and jwt token in local storage to keep user logged in between page refreshes
  // we encode the user details in base 64 so malware cant harvest the details
  // nothing important is stored locally.
  storeUser() {
    localStorage.setItem("currentMovieUser", window.btoa(JSON.stringify(this.currentUserSubject.value)));
  }

  updateLoggedInUser(user: User) {
    this.token = user.token;
    this.currentUserSubject.next(user);
    this.storeUser();
  }
}
