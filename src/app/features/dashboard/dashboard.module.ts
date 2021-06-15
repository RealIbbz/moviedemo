import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/core/material.module';
import { DashboardComponent } from './dashboard.component';
import { MoviesModule } from 'src/app/shared/components/movies/movies.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MoviesModule,
    DashboardRoutingModule,
    MaterialModule,
    CoreModule
  ]
})
export class DashboardModule { }
