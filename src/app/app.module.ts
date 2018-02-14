import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { AuthService } from './auth.service';

import { environment } from './../environments/environment';

@NgModule({
  declarations: [AppComponent, RedirectComponent, UserDetailsComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
