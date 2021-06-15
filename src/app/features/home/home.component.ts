import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/core/authentication/login/login-dialog.component';
import { RegisterDialogComponent } from 'src/app/core/authentication/register/register-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  
  onClickLogin() {
    this.dialog.open(LoginDialogComponent, {
    });
  }


  onClickRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
    });
  }

}
