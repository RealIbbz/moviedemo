import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    SideNavComponent,
    MainNavComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    AuthenticationModule
  ],
  exports:[
    SideNavComponent,
    MainNavComponent,
    LoadingComponent
  ]
})
export class CoreModule {
}
