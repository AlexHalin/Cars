import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddOwnerComponent} from './pages/add-owner/add-owner.component';
import {TableComponent} from './pages/table/table.component';
import {EditOwnerComponent} from './pages/edit-owner/edit-owner.component';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'add-owner', component: AddOwnerComponent},
  {path: 'edit-owner/:id', component: EditOwnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
