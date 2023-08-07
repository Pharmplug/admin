import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoginAllow } from 'src/app/models/loginAllow.models';
import { FileUpload } from '../../../models/file-upload';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  private dbPath = '/promotions';
  private basePath = '/push_notification_images';
  userRef: AngularFirestoreCollection<LoginAllow>;

  constructor(public db: AngularFirestore,public afdb: AngularFireDatabase, private storage: AngularFireStorage ) {
    this.userRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    //return this.userRef;
    let data= this.db.collection('/promotions');
    return data;
  }


  getLoginAllowData(): Observable<LoginAllow[]> {
    return this.userRef.valueChanges();
  }

  createCollection(){
    this.db.collection('promotions');
  }

  addpromoData(loginAllow: LoginAllow): Promise<any> {
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

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    localStorage.removeItem('fcmImg');
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;

          this.getFileUrl(fileUpload.url);
          this.saveFileData(fileUpload);
          
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.afdb.list(this.basePath).push(fileUpload).then(()=>{
    })


    
    
 
  }

 getFileUrl(data:any){
   localStorage.setItem('fcmImg', data);
  
  }

  // getFiles(numberItems: number): AngularFireList<FileUpload> {
  //   return this.dbase.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.afdb.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
  
}
