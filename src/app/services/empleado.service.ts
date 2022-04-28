import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) {

   }

   addEmployee(employee: any): Promise<any>{
      return this.firestore.collection('employees').add(employee)
   }

   // Listar empleados 
   getEmployees(): Observable<any>{
     return this.firestore.collection('employees', ref => ref.orderBy('createDate', 'desc')).snapshotChanges();
   }

   // Obtenemos la peticion a firestore de los datos del empleado a editar
   getEmployee(id: string): Observable<any>{
     return this.firestore.collection('employees').doc(id).snapshotChanges();
   }

   updateEmployee(id: string, data: any): Promise<any>{
    return this.firestore.collection('employees').doc(id).update(data);
   }

   // Eliminar empleado por id
  deleteEmployee(id: string): Promise<any>{
    return this.firestore.collection('employees').doc(id).delete();
  }
}
