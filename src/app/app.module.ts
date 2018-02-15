import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { AuthService } from './auth.service';
import { MessageService } from './messages/message.service';

import { environment } from './../environments/environment';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageDetailsComponent } from './messages/message-details/message-details.component';
import { MessageFormComponent } from './messages/message-form/message-form.component';
import { UidToUsernamePipe } from './messages/uid-to-username.pipe';

const routes: Routes = [
  { path: '', component: UserDetailsComponent },
  { path: 'redirect', component: RedirectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    UserDetailsComponent,
    MessageListComponent,
    MessageDetailsComponent,
    MessageFormComponent,
    UidToUsernamePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
