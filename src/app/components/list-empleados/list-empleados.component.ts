import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  employees: any[] = []

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  // Listar empleados
  getEmployees(){
    this._empleadoService.getEmployees().subscribe( data => {
      
      this.employees = [];

      data.forEach((element:any) => {
        /*console.log(element.payload.doc.id)*/
        //console.log(element.payload.doc.data())
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.employees);
    })
  }

  deleteEmployee(id: string){
    this._empleadoService.deleteEmployee(id).then( () =>{
       //console.log("Empleado eliminado con exito");
       this.toastr.error('Empleado eliminado con exito!', 'Empleado eliminado', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
