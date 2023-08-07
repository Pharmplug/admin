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

  async setup() {
    const steps = [
      { name: "Issuer account", pub: environment.testnet.ISSUER_PUB },
      { name: "Distributor account", pub: environment.testnet.DIST_PUB },
      { name: "Pool account", pub: environment.testnet.POOL_PUB }
    ];
  
    const result: any = {};
  
    for (const step of steps) {
      try {
        await axios.get(environment.testnet.BOTURL + "/?addr=" + step.pub);
        console.log(`${step.name} setup done`);
        result[step.name] = `${step.name} setup done`;
      } catch (error: any) {
        if (error.response.data.status == 400) {
          console.log(`${step.name} setup done`);
          result[step.name] = `${step.name} setup done`;
        } else {
          console.log(`${step.name} setup failed`);
        }
      }
    }
  
    return result;
  }
  
  
}
