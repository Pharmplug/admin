import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDetailsComponent } from './customers/customer-details/details-customer.component';
import { UserOutflowComponent } from './outflow/user-outflow.transaction/user.outflow.transaction.component';
import { PagesBlankComponent } from './pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages-contact/pages-contact.component';
import { PagesError404Component } from './pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages-faq/pages-faq.component';
import { TransactionComponent } from './transactions/transaction.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { CustomersComponent } from './customers/customers.component';
import { KYCDetailsComponent } from './kyc/kyc-Details/kyc.details.component';
import { KYCComponent } from './kyc/kyc.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ACHTransactionComponent } from './ach-transaction/ach.transaction.component';
import { UserTransactionComponent } from './transactions/user-transaction/user.transaction.component';
import { OutflowComponent } from './outflow/outflow.transaction.component';
import { InflowComponent } from './inflow/inflow.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MtlComponent } from './mtl-licence/mtl.component';
import { LoginHistoryComponent } from './login-history/login.history.component';
import { FeesComponent } from './fees/fees.component';
import { IamComponent } from './iam/iam.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserACHTransactionComponent } from './ach-transaction/user-ach.transaction/user.ach.transaction.component';
import { MaterialModule } from 'src/app/material';
import { Base64Pipe } from '../../shared/convert-base64-img.pipe';
import { PaginationComponent } from 'src/app/_components';
import { ReportDialog } from './transactions/report/report';
import { CustomersReportDialog } from './customers/report/report.customers';
import { MarketComponent } from './markets/market.component';
import { ResetComponent } from './reset/reset-net.component';



@NgModule({

  declarations: [
    PaginationComponent,
    PagesBlankComponent,
    UserACHTransactionComponent, 
    PagesContactComponent,
    PagesError404Component,
    PagesFaqComponent,
    PromotionsComponent,
    UsersProfileComponent,
    DashboardComponent,
    TransactionComponent,
    CustomersComponent,
    KYCComponent,
    KYCDetailsComponent,
    CustomerDetailsComponent,
    ACHTransactionComponent,
    UserTransactionComponent,
    OutflowComponent,
    InflowComponent,
    MtlComponent,
    MarketComponent,
    LoginHistoryComponent,
    FeesComponent,
    IamComponent,
    UserOutflowComponent,
    Base64Pipe,
    ReportDialog,
    CustomersReportDialog,
    ResetComponent
 

  ],
  imports: [
    AdminRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule, MatDialogModule,
    CommonModule
  ]
})
export class AdminModule { }