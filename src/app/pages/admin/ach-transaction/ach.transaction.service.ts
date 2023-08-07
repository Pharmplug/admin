import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Ach from '../../../models/ach.model';

@Injectable({
  providedIn: 'root'
})
export class AchService {
  private dbPath = '/achTransactions';

  achRef: AngularFirestoreCollection<Ach>;

  constructor(private db: AngularFirestore) {
    this.achRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    let data= this.db.collection('/achTransactions', ref => ref.orderBy('created_at','desc'));
    return data;
  }

  async getById(id:any): Promise<any>{
    let document = await this.db.collection('achTransactions').doc(id).get();
    return document;
  }

}
