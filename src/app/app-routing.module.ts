import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/authentication.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', canActivate: [ AuthGuard ], loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: '**', redirectTo: 'signin'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
