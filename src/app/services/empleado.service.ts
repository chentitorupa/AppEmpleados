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

   // Eliminar empleado por id
  deleteEmployee(id: string): Promise<any>{
    return this.firestore.collection('employees').doc(id).delete();
  }
}
