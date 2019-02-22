import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'dashboard',
    children: DashboardRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
