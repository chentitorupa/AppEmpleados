import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ErrorComponent } from './components/error/error.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-empleados', pathMatch: 'full'},
  { path: 'list-empleados', component: ListEmpleadosComponent},
  { path: 'create-empleado', component: CreateEmpleadoComponent},
  { path: 'edit-employee/:id', component: CreateEmpleadoComponent},
  { path: '404', component:ErrorComponent},
  { path: '**', redirectTo:'404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
