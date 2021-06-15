import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { FavouritesComponent } from './favourites.component';
// import { HomeAuthResolver } from './home-auth-resolver.service';

const routes: Routes = [
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [AuthenticationGuard]
    // resolve: {
    //   isAuthenticated: HomeAuthResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouritesRoutingModule {}