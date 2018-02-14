import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { AuthService } from './auth.service';

import { environment } from './../environments/environment';

const routes: Routes = [
  { path: '', component: UserDetailsComponent },
  { path: 'redirect', component: RedirectComponent }
];

@NgModule({
  declarations: [AppComponent, RedirectComponent, UserDetailsComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
