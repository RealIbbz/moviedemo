import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailDialogComponent } from './dialog/movie-detail-dialog.component';
import { MaterialModule } from 'src/app/core/material.module';
import { MoviesComponent } from './movies.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [MovieDetailDialogComponent, MoviesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule
  ],
  exports: [
    MoviesComponent
  ]
})
export class MoviesModule { }
