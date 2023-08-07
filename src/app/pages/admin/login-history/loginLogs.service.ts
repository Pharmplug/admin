import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Logs from '../../../models/logs.model';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginLogsService {
  private dbPath = '/login_logs';

  LoginLogsRef: AngularFirestoreCollection<Logs>;

  constructor(private db: AngularFirestore,

    ) {
    this.LoginLogsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Logs> {
  
    return this.db.collection('/login_logs', r => r
          .orderBy('date_time', 'desc').limit(10));
  }

  
  create(loginLogs: Logs): any {
    return this.LoginLogsRef.add({ ...loginLogs });
  }

  // public getIPAddress()  
  // {  
  //   return this.http.get("https://api.ipify.org/?format=json");  
  // }

  
}
