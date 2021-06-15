import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NotificationService } from '../../services/notification-service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: "login-dialog-dialog",
  template: `
    <h1 mat-dialog-title>{{title}}</h1>
    <div fxLayout="row" fxLayoutAlign="center center" *ngIf="progressSpin">
      <div class="loading" >
      <mat-spinner [diameter]="75" style="margin:auto;">Loading...</mat-spinner>
      </div>
    </div>

    <div mat-dialog-content style="min-width: 500px;" *ngIf="!progressSpin">
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

            <mat-form-field style="width:100%" >
                <mat-label>Email</mat-label>
                <input matInput placeholder="Username" formControlName="username" name="username" type="email" autocomplete="username">
                <mat-error *ngIf="submitted && f.username.errors">Must be in an email format and be less than 100 characters</mat-error>
              </mat-form-field><br>

            <mat-form-field style="width:100%">
              <mat-label>Password</mat-label>
              <input matInput placeholder="password" formControlName="password" name="password" type="password" autocomplete="current-password" (keyup.enter)="onSubmit()">
              <mat-error *ngIf="submitted && f.password.errors">Password is required and be between 5 and 50 characters</mat-error>
            </mat-form-field><br>           
            <br>

        </form>
    </div>
    <div mat-dialog-actions class="default-button"  fxLayout="row" fxLayoutAlign="end" fxLayoutGap="20px" *ngIf="!progressSpin">
    <button mat-stroked-button (click)="onClickCancel()" color="primary">CANCEL</button>  
      <button mat-raised-button (click)="onSubmit()" color="primary">LOGIN</button>
    </div>
  `
})
export class LoginDialogComponent {
  progressSpin:boolean = true;

  selectedClient = {code: 'students', name: 'Demo'};
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  title: string = 'Login';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>
    , private authenticationService: AuthenticationService
    , private route: ActivatedRoute
    , private router: Router
    , private notificationService: NotificationService
    , private formBuilder: FormBuilder
    , @Inject(MAT_DIALOG_DATA) public data: {}) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(100)]],
        password: ['', [Validators.required , Validators.minLength(5), Validators.maxLength(50)]]
      });
      this.progressSpin = false;


      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/default';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(field => { 
        const control = this.loginForm.get(field);
        control!.markAsTouched({ onlySelf: true });      
      });
      console.log(this.f.username.errors)
      return;
    }

    this.loading = true;
    this.progressSpin = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        user => {
          if (user && user.token) {
            this.router.navigate(['/dashboard']);
            this.dialogRef.close();
          } else {
            //this.notificationService.show('Incorrect Password or Unknown user.');
          }
          this.progressSpin = false;
        },
        error => {
          //this.notificationService.show(error);
          this.notificationService.show('Failed to login.');
          this.loading = false;
          this.progressSpin = false;
        });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

}
