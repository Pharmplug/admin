import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Settings from '../../../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private dbPath = '/dashboardSettings';
  userRef: AngularFirestoreCollection<Settings>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }

  async getData(): Promise<any> {
    let document = await this.db.collection('dashboardSettings').doc('settings').get();
    return document;
  }

  //   update(data: any): Promise<void> {
  //     return this.userRef.doc('settings').update(data);
  //   }

  update(id: string, data: any): Promise<any> {
    return this.db.collection('dashboardSettings').doc('settings').update(data);
  }
}
