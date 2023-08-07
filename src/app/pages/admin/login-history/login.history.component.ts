import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { LoginLogsService } from './loginLogs.service';
import { LoginComponent } from '../../auth/pages-login/pages-login.component';
import Logs from '../../../models/logs.model';
import { FormBuilder } from '@angular/forms';
import Mtl from 'src/app/models/mtl.model';
import { MtlService } from '../mtl-licence/mtl.service';
import { IamService } from '../iam/iam.service';
import { LoginAllow } from 'src/app/models/loginAllow.models';


@Component({
  selector: 'app-settings',
  templateUrl: './login.history.component.html',
  styleUrls: ['./login.history.component.css'],
  providers: [LoginLogsService]
})
export class LoginHistoryComponent implements OnInit {

  loginAllowList!: LoginAllow[];
  filteredRoles!: LoginAllow[];
  filteredSUAdminRoles: any = LoginAllow;
  SUEmail: any
  SUid: any
  SUHistory:any;
  constructor(private iamService: IamService) { }

  // Initializes component on load
  async ngOnInit() {
    this._fetchData()

  }


  // This function fetches all the data from the collection and subscribes to the changes
  _fetchData() {
    this.iamService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      // Stores the fetched data into loginAllowList
      this.loginAllowList = data
      console.log(this.loginAllowList);
      this.getRoles()
      this.adminRole()
    });
  }

  // This function filters the roles in the loginAllowList and stores them in filteredRoles
  getRoles(): void {

    // Checks if loginAllowList is not null or undefined
    if (!this.loginAllowList) {
      console.error('loginAllowList is undefined or null.');
      return;
    }

    // Filters the roles in the loginAllowList and stores them in filteredRoles
    this.filteredRoles = this.loginAllowList.filter((data: any) => data.role !== '3');
    console.log(this.filteredRoles);
  }

  // This function filters the roles in the loginAllowList and stores them in filteredRoles
  adminRole() {

    // Checks if loginAllowList is not null or undefined
    if (!this.loginAllowList) {
      console.error('loginAllowList is undefined or null.');
      return;
    }

    // Filters the roles in the loginAllowList and stores them in filteredRoles
    this.filteredSUAdminRoles = this.loginAllowList.filter((data: any) => data.role === '3');
this.SUHistory=this.filteredSUAdminRoles[0].history
    this.SUEmail = this.filteredSUAdminRoles[0].email
    this.SUid = this.filteredSUAdminRoles[0].id
    console.log(this.filteredSUAdminRoles, this.SUEmail);
  }
}