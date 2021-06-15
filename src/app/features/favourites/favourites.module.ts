import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { MaterialModule } from 'src/app/core/material.module';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { MoviesModule } from 'src/app/shared/components/movies/movies.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    FavouritesRoutingModule,
    MaterialModule,
    MoviesModule,
    CoreModule
  ]
})
export class FavouritesModule { }
