import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmployee: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
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
    //Imprime el formulario en consola
    console.log(this.createEmployee)
    console.log(employee)
  }
}
