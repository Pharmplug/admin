import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDetailsComponent } from './customers/customer-details/details-customer.component';
import { UserOutflowComponent } from './outflow/user-outflow.transaction/user.outflow.transaction.component';
import { PagesBlankComponent } from './pages-blank/pages-blank.component';
import { PagesError404Component } from './pages-error404/pages-error404.component';
import { StoreComponent } from './store/store.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { CustomersComponent } from './customers/customers.component';
import { DrugDetailsComponent } from './store/drug-store/drug.store.component';
import { OutflowComponent } from './outflow/outflow.transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IamComponent } from './iam/iam.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestComponent } from './request/requestcomponent';
import { RequestInfoComponent } from './request/request-info/requests.info.component';
import { MaterialModule } from 'src/app/material';
import { Base64Pipe } from '../../shared/convert-base64-img.pipe';
import { PaginationComponent } from 'src/app/_components';
import { ReportDialog } from './store/report/report';
import { CustomersReportDialog } from './customers/report/report.customers';




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
    OutflowComponent,
    IamComponent,
    UserOutflowComponent,
    Base64Pipe,
    ReportDialog,
    CustomersReportDialog
 

  ],
  imports: [
    AdminRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule, MatDialogModule,
    CommonModule
  ]
})
export class AdminModule { }