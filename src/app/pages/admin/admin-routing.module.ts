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



const routes: Routes = [
  { path: '', component: DashboardComponent,},
  { path: 'customer-details',component: CustomerDetailsComponent, },
  { path: 'request', component: RequestComponent, },
  { path: 'store', component: StoreComponent, },
  { path: 'drug-details', component: DrugDetailsComponent, },
  { path: 'requests', component: RequestComponent,},
  { path: 'requests-info', component: RequestInfoComponent,},
  { path: 'settings-iam', component: IamComponent,},
  { path: 'customers', component: CustomersComponent,},
  { path: 'outflow', component: OutflowComponent,canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'user-outflow-transaction', component: UserOutflowComponent,canActivate: [AuthGuard,DevAccessGuard]},
  { path: 'error404', component: PagesError404Component },
  { path: 'blank', component: PagesBlankComponent },
  { path: 'user-profile', component: UsersProfileComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
