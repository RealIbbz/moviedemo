import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UsersService } from '../../services/users.service';
import { NotificationService } from '../../services/notification-service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: "register-dialog-dialog",
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
              <input matInput placeholder="Email" formControlName="email" name="email" type="email" autocomplete="email">
              <mat-error *ngIf="submitted && f.email.errors">Must be in an email format and be less than 100 characters</mat-error>
            </mat-form-field><br>

            <mat-form-field style="width:100%" >
              <mat-label>Name</mat-label>
              <input matInput placeholder="Full Name" formControlName="fullName" name="fullName" autocomplete="fullName">
              <mat-error *ngIf="submitted && f.fullName.errors">Name is required and be less than 200 characters</mat-error>
            </mat-form-field><br>

            <mat-form-field style="width:100%">
              <mat-label>Password</mat-label>
              <input matInput placeholder="Password" formControlName="password" name="password" type="password" autocomplete="current-password" (keyup.enter)="onSubmit()">
              <mat-error *ngIf="submitted && f.password.errors">Password is required and be between 5 and 50 characters</mat-error>
            </mat-form-field><br>           
            <br>

        </form>
    </div>
    <div mat-dialog-actions  fxLayout="row" fxLayoutAlign="end" fxLayoutGap="20px" *ngIf="!progressSpin" >
      <button mat-stroked-button (click)="onClickCancel()" color="primary">CANCEL</button>  
      <button mat-raised-button (click)="onSubmit()" color="primary">REGISTER</button>
    </div>

  `
})
export class RegisterDialogComponent {
  progressSpin:boolean = true;

  loginForm: FormGroup;
  submitted = false;
  title: string = 'Register';

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>
    , private router: Router
    , private userService: UsersService
    , private notificationService: NotificationService
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , @Inject(MAT_DIALOG_DATA) public data: {}) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(100)]],
        fullName: ['', [Validators.required , Validators.minLength(1), Validators.maxLength(200)]],
        password: ['', [Validators.required , Validators.minLength(5), Validators.maxLength(50)]]
      });
      this.progressSpin = false;

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.progressSpin = true;
    this.userService.createUser(this.f.email.value, this.f.fullName.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        user => {
          this.router.navigate(['/dashboard']);
          this.dialogRef.close();          
          this.progressSpin = false;
        },
        error => {
          //this.notificationService.show(error);
          this.notificationService.show('Failed to create user');
          this.progressSpin = false;
        });
  }

  onClickCancel() {
    this.dialogRef.close();
  }


}
