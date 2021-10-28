import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { HomeComponent } from './home/home.component';
import { ShipsComponent } from './ships/ships.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'edit-company/:id', component: AddCompanyComponent },
  { path: 'company/:id', component: AddCompanyComponent },
  { path: 'register_ship/:id', component: ShipsComponent },
  { path: 'edit_ship/:id', component: ShipsComponent },
  { path: '**',  redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
