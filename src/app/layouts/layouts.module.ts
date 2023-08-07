import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { LayoutsComponent } from './layouts.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { VerticalComponent } from './vertical/vertical.component';




@NgModule({
  declarations: [
    LayoutsComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    VerticalComponent,

  ],
  imports: [
    CommonModule,

    RouterModule,

  ]
})
export class LayoutsModule { }
