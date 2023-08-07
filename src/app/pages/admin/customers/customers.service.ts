import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';

  userRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    //return this.userRef;

    let data= this.db.collection('/users', ref => ref.where('isDeleted', '==', '0').orderBy('registration_date', 'desc'));
    return data;

  }

  async getById(id: string | undefined): Promise<any>{
    let document = await this.db.collection('users').doc(id).get();
    return document;
  }

  async getPrivateData(id: string | undefined): Promise<any>{
    let document = await this.db.collection('users').doc(id).collection('privateCollection').doc(id).get();
    return document;
  }

  async getfacePhiDataCollection(id: string | undefined): Promise<any>{
    let document = await this.db.collection('users').doc(id).collection('privateCollection').doc(id).collection('facePhiData').doc(id).get();
    return document;
  }

  create(user: User): any {
    return this.userRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update(data);
  }

  updatePrivateData(id: string, data: any): Promise<void> {

    return this.db.collection('users').doc(id).collection('privateCollection').doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}


