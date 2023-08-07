import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UserService } from '../customers/customers.service';
import { map } from 'rxjs';
import Customer from 'src/app/models/user.model';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-pages-inflow',
  templateUrl: './inflow.component.html',
  styleUrls: ['./inflow.component.css']
})
export class InflowComponent {
  items: Customer[] = []; // Array to store API data
  selectedItems: any[] = []; // Array to store selected items

  sendFCM!: any
  allFcmTokens!: any
  // Simulating API call in the constructor
  constructor(private userService: UserService,) {
    this.fetchDataFromAPI();
  }


  fetchDataFromAPI(){
    this.userService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map((users: any[]) =>
        users.filter((user: any) => user.idVerified === true)
      )
    ).subscribe(data => {
      // data now contains only the users where idVerified is true
      this.items = data;
      const hasToken = this.items.filter((mUser: any) => mUser.fcmToken != null || mUser.fcmToken != undefined)
      this.allFcmTokens = hasToken.map(obj => obj.fcmToken);
    });
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  toggleItemSelection(item: any) {
    const index = this.selectedItems.findIndex((selectedItem) => selectedItem === item.fcmToken);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item.fcmToken);
    }
    console.log(this.selectedItems);
  }
  
  

  toggleAllItemsSelection(checked: any) {
    checked.target.checked
    if (checked.target.checked) {
      this.selectedItems = [...this.items];
      this.sendFCM=this.allFcmTokens
      console.log(this.sendFCM)
    } else {
      this.selectedItems = [];
      this.sendFCM=[];
      console.log(this.selectedItems)
    }
  }

  isAllSelected(): boolean {
    return this.selectedItems.length === this.items.length;
  }
}