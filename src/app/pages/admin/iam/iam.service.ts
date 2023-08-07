import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { LoginAllow } from 'src/app/models/loginAllow.models';

@Injectable({
  providedIn: 'root'
})
export class IamService {
  private dbPath = '/loginAllow';
  userRef: AngularFirestoreCollection<LoginAllow>;

  constructor(public db: AngularFirestore, ) {
    this.userRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<any> {
    //return this.userRef;

    let data= this.db.collection('/loginAllow');
    return data;

  }
  getLoginAllowData(): Observable<LoginAllow[]> {
    return this.userRef.valueChanges();
  }

  createCollection(){
    this.db.collection('loginAllow');
  }
  addLoginAllowData(loginAllow: LoginAllow): Promise<any> {
    return this.userRef.add(loginAllow);
  }
  update(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update(data);
  }
  deleteUser(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
  
  emptyCollection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userRef.get().subscribe(querySnapshot => {
        const batch = this.db.firestore.batch();
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        batch.commit().then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    });
  }
  
}
