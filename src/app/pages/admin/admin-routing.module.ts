import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesBlankComponent } from './pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages-contact/pages-contact.component';
import { PagesError404Component } from './pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages-faq/pages-faq.component';
import { CustomerDetailsComponent } from './customers/customer-details/details-customer.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { TransactionComponent } from './transactions/transaction.component';
import { CustomersComponent } from './customers/customers.component';
import { KYCDetailsComponent } from './kyc/kyc-Details/kyc.details.component';
import { KYCComponent } from './kyc/kyc.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ACHTransactionComponent } from './ach-transaction/ach.transaction.component';
import { OutflowComponent } from './outflow/outflow.transaction.component';
import { UserACHTransactionComponent } from './ach-transaction/user-ach.transaction/user.ach.transaction.component';
import { UserOutflowComponent } from './outflow/user-outflow.transaction/user.outflow.transaction.component';
import { UserTransactionComponent } from './transactions/user-transaction/user.transaction.component';
import { MtlComponent } from './mtl-licence/mtl.component';
import { LoginHistoryComponent } from './login-history/login.history.component';
import { FeesComponent } from './fees/fees.component';
import { IamComponent } from './iam/iam.component';
import { AuthGuard } from 'src/app/auth.guard';
import { DevAccessGuard } from 'src/app/access-control.guard';
import { InflowComponent } from './inflow/inflow.component';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './markets/market.component';
import { ResetComponent } from './reset/reset-net.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'customer-details',component: CustomerDetailsComponent, },
  { path: 'achTransactions', component: ACHTransactionComponent, },
  { path: 'promotions', component: PromotionsComponent,},
  { path: 'transactions', component: TransactionComponent, },
  { path: 'user-transaction', component: UserTransactionComponent, },
  { path: 'user-achTransactions', component: UserACHTransactionComponent,},
  { path: 'settings-mtl', component: MtlComponent, },
  { path: 'settings-testnetReset', component:ResetComponent,canActivate: [AuthGuard] },
  { path: 'settings-markets', component: MarketComponent,canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'settings-fees', component: FeesComponent, canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'settings-iam', component: IamComponent,},
  { path: 'settings-loginHistory', component: LoginHistoryComponent,canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'customers', component: CustomersComponent,},
  { path: 'outflow', component: OutflowComponent,canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'inflow', component: InflowComponent,canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'user-outflow-transaction', component: UserOutflowComponent,canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'contact', component: PagesContactComponent },
  { path: 'error404', component: PagesError404Component },
  { path: 'faq', component: PagesFaqComponent },
  { path: 'blank', component: PagesBlankComponent },
  { path: 'kyc-details', component: KYCDetailsComponent,canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'kyc', component: KYCComponent,canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'user-profile', component: UsersProfileComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
