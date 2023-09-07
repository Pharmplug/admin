import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesBlankComponent } from './pages-blank/pages-blank.component';
import { PagesError404Component } from './pages-error404/pages-error404.component';
import { CustomerDetailsComponent } from './customers/customer-details/details-customer.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { StoreComponent } from './store/store.component';
import { CustomersComponent } from './customers/customers.component';
import { RequestComponent } from './request/requestcomponent';
import { OutflowComponent } from './outflow/outflow.transaction.component';
import { RequestInfoComponent } from './request/request-info/requests.info.component';
import { UserOutflowComponent } from './outflow/user-outflow.transaction/user.outflow.transaction.component';
import {DrugDetailsComponent } from './store/drug-store/drug.store.component';
import { IamComponent } from './iam/iam.component';
import { AuthGuard } from 'src/app/auth.guard';
import { DevAccessGuard } from 'src/app/access-control.guard';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { CoverageComponent } from './coverage/coverage.component';
import { PaymentsComponent } from './payments/payments.component';



const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],},
  { path: 'customer-details',component: CustomerDetailsComponent, canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'store', component: StoreComponent,  canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'drug-details', component: DrugDetailsComponent, canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'pharmacy-details', component: DrugDetailsComponent, canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard,DevAccessGuard] },
  { path: 'requests', component: RequestComponent, canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'pharmacies', component: PharmacyComponent, canActivate: [AuthGuard]},
  { path: 'edit-request', component: RequestInfoComponent, canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'settings-iam', component: IamComponent, canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'coverage', component: CoverageComponent, canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'outflow', component: OutflowComponent,canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'user-outflow-transaction', component: UserOutflowComponent,canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'error404', component: PagesError404Component },
  { path: 'blank', component: PagesBlankComponent },
  { path: 'user-profile', component: UsersProfileComponent, canActivate: [AuthGuard,DevAccessGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
