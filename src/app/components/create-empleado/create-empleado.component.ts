import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  // Variable de  para editar(string) o para crear empleado(null)
  id: string | null;

  title = 'Agregar Empleado';

  constructor(private fb: FormBuilder,
              private _employeeService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createEmployee = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      document: ['', Validators.required],
      salary: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.isEdit();
  }

  addEditEmployee(){
    this.submitted = true;

    if (this.createEmployee.invalid) {
      return;
    }

    if (this.id === null) {
      this.addEmployee();
    }else{
      this.editEmployee(this.id);
    }
  }

  addEmployee(){
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


  editEmployee(id: string){
    
    const employee: any ={
      name: this.createEmployee.value.name,
      last_name: this.createEmployee.value.last_name,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      updateDate: new Date()
    }

    this.loading =  true;

    this._employeeService.updateEmployee(id, employee).then( () => {
      this.loading = false;
      this.toastr.info('Empleado modificado con exito!', 'Empleado actualizado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados'])
    })
  }

  isEdit(){
    this.title = 'Editar empleado';
    if (this.id !== null) {
      this.loading = true;
      this._employeeService.getEmployee(this.id).subscribe( data => {
        this.loading = false;
        //console.log(data.payload.data()['name']);
        this.createEmployee.setValue({
          name: data.payload.data()['name'],
          last_name: data.payload.data()['last_name'],
          document: data.payload.data()['document'],
          salary: data.payload.data()['salary'],
        })
      })
    }
  }

}
