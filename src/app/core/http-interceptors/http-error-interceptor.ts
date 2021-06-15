import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { NotificationService } from '../services/notification-service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        console.error(error);
        if (error.error && Object.keys(error.error).length !== 0) {
          this.notificationService.show('Error occurred: ' + error.error);
        } else {
          this.notificationService.show('Error occurred: ' + error.status + " - " + error.statusText);
        }
        return throwError(error.message);
      })
    )
  }
    
}