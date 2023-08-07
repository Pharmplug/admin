import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { PagesError404Component } from './pages/admin/pages-error404/pages-error404.component';
import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'admin',
    component: LayoutsComponent,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard]

  },
  { path: '**', component: PagesError404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
