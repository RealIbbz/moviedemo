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
      catchError((errorResponse) => {
        console.error(errorResponse);
        if (errorResponse.error && Object.keys(errorResponse.error).length !== 0) {
          this.notificationService.show('Error occurred: ' + errorResponse.error);
        } else {
          this.notificationService.show('Error occurred: ' + errorResponse.status + " - " + errorResponse.statusText);
        }
        return throwError(errorResponse.message);
      })
    )
  }
    
}