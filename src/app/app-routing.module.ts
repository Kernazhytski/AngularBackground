import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { TablePageComponent } from './table-page/table-page.component';

const routes: Routes = [
  {
    path: 'table',
    component: TablePageComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
