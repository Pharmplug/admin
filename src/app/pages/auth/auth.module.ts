import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"; 
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages-login/pages-login.component';
import { RegisterComponent } from './pages-register/pages-register.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [

    LoginComponent,
    RegisterComponent
  ],
  imports: [
    
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    
  ]
})
export class AuthModule { }