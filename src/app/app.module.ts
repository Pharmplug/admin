
//Angular Imports
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

//FCM
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

//Routings
import { HttpClientModule } from '@angular/common/http';

//Pages IMport
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import {  ReactiveFormsModule } from '@angular/forms';







@NgModule({ 
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireMessagingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({}),
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgxPaginationModule,
    HttpClientModule,
      
    

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }