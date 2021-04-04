import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {TableComponent} from './pages/table/table.component';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'add-user', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
