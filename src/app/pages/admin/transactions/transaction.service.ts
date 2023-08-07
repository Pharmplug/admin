import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Transaction from '../../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private dbPath = '/transactions';

  transactionRef: AngularFirestoreCollection<Transaction>;

  constructor(private db: AngularFirestore) {
    this.transactionRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    let data= this.db.collection('/transactions', ref => ref.orderBy('created_at','desc'));
    return data;
  }

  async getById(id: string | undefined): Promise<any>{
    let document = await this.db.collection('transactions').doc(id).get();
    return document;
  }

  create(transaction: Transaction): any {
    return this.transactionRef.add({ ...transaction });
  }

  update(id: string, data: any): Promise<void> {
    return this.transactionRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.transactionRef.doc(id).delete();
  }
}
