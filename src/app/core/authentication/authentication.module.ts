import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { LoginDialogComponent } from './login/login-dialog.component';
import { MaterialModule } from '../material.module';
import { RegisterDialogComponent } from './register/register-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,   
    MaterialModule
  ],
  declarations: [LoginDialogComponent, RegisterDialogComponent]
})
export class AuthenticationModule {}
