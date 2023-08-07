import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import RateLogs from 'src/app/models/rate.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private dbPath = '/localFxRates';
  userRef: AngularFirestoreCollection<RateLogs>;

  constructor(public db: AngularFirestore, ) {
    this.userRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<any> {
    //return this.userRef;

    let data= this.db.collection('/localFxRates');
    return data;

  }
  getLoginAllowData(): Observable<RateLogs[]> {
    return this.userRef.valueChanges();
  }

  createCollection(){
    this.db.collection('localFxRates');
  }
  addRateData(rateLogs: RateLogs): Promise<any> {
    return this.userRef.add(rateLogs);
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
