import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ShipsComponent } from './ships/ships.component';
import { ListShipsComponent } from './list-ships/list-ships.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    AddCompanyComponent,
    LogoutComponent,
    ShipsComponent,
    ListShipsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
