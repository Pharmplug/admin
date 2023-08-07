import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Mtl from '../../../models/mtl.model';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MtlService {
  private dbPath = '/mtlLicence';
  userRef: AngularFirestoreCollection<Mtl>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }

  async getById(): Promise<any> {
    let document = await this.db.collection('mtlLicence').doc('mtl').get();
    return document;
  }

  update(data: any): Promise<void> {
    return this.userRef.doc('mtl').update(data);
  }

  
  
}
