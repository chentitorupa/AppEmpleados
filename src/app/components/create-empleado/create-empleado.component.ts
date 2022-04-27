import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmployee: FormGroup;
  submitted = false;
  // Variable de carga 
  loading = false;

  constructor(private fb: FormBuilder,
              private _employeeService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService) {
    this.createEmployee = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      document: ['', Validators.required],
      salary: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  addEmployee(){
    this.submitted = true;

    if (this.createEmployee.invalid) {
      return;
    }

    const employee: any ={
      name: this.createEmployee.value.name,
      last_name: this.createEmployee.value.last_name,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      createDate: new Date(),
      updateDate: new Date()
    }
    this.loading = true;
    //Imprime el formulario en consola
    //console.log(this.createEmployee)
    //console.log(employee)

    this._employeeService.addEmployee(employee).then( () => {
      //console.log("Empleado registrado con exito!");
      this.toastr.success('Empleado registrado con exito!', 'Empleado registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      // Redirecciona al componente de listar empleados
      this.router.navigate(['/list-empleados'])
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    })

  }
}
