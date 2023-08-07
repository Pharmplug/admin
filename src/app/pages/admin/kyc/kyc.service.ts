import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import FacePhi from 'src/app/models/facePhi.model';
import Kyc from '../../../models/kyc.model';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private dbPath = '/kyc';
  public mykyc!:Kyc;

  kycRef: AngularFirestoreCollection<Kyc>;

  constructor(private db: AngularFirestore) {
    this.kycRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Kyc> {
    return this.kycRef;
  }

  async getDocuPassDataCollection(id: string | undefined): Promise<any>{
    let document = await this.db.collection('users').doc(id).collection('privateCollection').doc(id).collection('facePhiData').doc(id).get();
    return document;
  }

  create(payment: Kyc): any {
    return this.kycRef.add({ ...payment });
  }

  update(id: string, data: any): Promise<void> {
    return this.kycRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.kycRef.doc(id).delete();
  }

}
