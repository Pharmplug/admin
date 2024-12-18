import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDetailsComponent } from './customers/customer-details/details-customer.component';

import { PagesBlankComponent } from './pages-blank/pages-blank.component';
import { PagesError404Component } from './pages-error404/pages-error404.component';
import { StoreComponent } from './store/store.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { CustomersComponent } from './customers/customers.component';
import { DrugDetailsComponent } from './store/drug-store/drug.store.component';

import { ReactiveFormsModule } from '@angular/forms';
import { IamComponent } from './iam/iam.component';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestComponent } from './request/requestcomponent';
import { RequestInfoComponent } from './request/request-info/requests.info.component';
import { MaterialModule } from 'src/app/material';
import { Base64Pipe } from '../../shared/convert-base64-img.pipe';
import { PaginationComponent } from 'src/app/_components';
import { NgxPaginationModule } from 'ngx-pagination';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { CoverageComponent } from './coverage/coverage.component';
import { PaymentsComponent } from './payments/payments.component';
import { PharmDetailsComponent } from './pharmacy/pharmacy-details/pharm.details.component';
import { RidersComponent } from './riders/riders.component';




@NgModule({

  declarations: [
    DashboardComponent,
    PaginationComponent,
    PagesBlankComponent,
    PagesError404Component,
    UsersProfileComponent,
    RequestComponent,
    RequestInfoComponent,
    StoreComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    RequestComponent,
    DrugDetailsComponent,
    IamComponent,
    Base64Pipe,
    PharmacyComponent,
    CoverageComponent,
    PaymentsComponent,
    PharmDetailsComponent,
    RidersComponent
   
 

  ],
  imports: [
    AdminRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule, MatDialogModule,
    CommonModule,  NgxPaginationModule,
    MatProgressSpinnerModule
  ]
})
export class AdminModule { }