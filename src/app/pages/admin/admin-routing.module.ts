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
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { CoverageComponent } from './coverage/coverage.component';
import { PaymentsComponent } from './payments/payments.component';
import { IAMAccessGuard } from 'src/app/iam-control.guard';
import { AdminAccessGuard } from 'src/app/admin-control.guard';
import { OperationsAccessGuard } from 'src/app/operations-control.guard';




const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],},
  { path: 'customer-details',component: CustomerDetailsComponent, canActivate: [AuthGuard,AdminAccessGuard] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard,AdminAccessGuard] },
  { path: 'store', component: StoreComponent,  canActivate: [AuthGuard]},
  { path: 'drug-details', component: DrugDetailsComponent, canActivate: [AuthGuard,AdminAccessGuard] },
  { path: 'pharmacy-details', component: DrugDetailsComponent, canActivate: [AuthGuard,AdminAccessGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard,AdminAccessGuard] },
  { path: 'requests', component: RequestComponent, canActivate: [AuthGuard,AdminAccessGuard,OperationsAccessGuard]},
  { path: 'pharmacies', component: PharmacyComponent, canActivate: [AuthGuard]},
  { path: 'edit-request', component: RequestInfoComponent, canActivate: [AuthGuard,AdminAccessGuard,OperationsAccessGuard]},
  { path: 'settings-iam', component: IamComponent, canActivate: [AuthGuard,IAMAccessGuard]},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  { path: 'coverage', component: CoverageComponent, canActivate: [AuthGuard]},
  { path: 'outflow', component: OutflowComponent,canActivate: [AuthGuard,AdminAccessGuard]},
  { path: 'user-outflow-transaction', component: UserOutflowComponent,canActivate: [AuthGuard,AdminAccessGuard]},
  { path: 'error404', component: PagesError404Component },
  { path: 'blank', component: PagesBlankComponent },
  { path: 'user-profile', component: UsersProfileComponent, canActivate: [AuthGuard,AdminAccessGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
