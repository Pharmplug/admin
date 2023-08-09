import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Transaction from "../../../../models/transaction.model"
import { TransactionService } from '../transaction.service';
import Drugs from 'src/app/models/drugs.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginAllow } from 'src/app/models/loginAllow.models';
import AdminModel from 'src/app/models/super.admin.mode';
import { IamService } from '../../iam/iam.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-user-transactions',
  templateUrl: './drug.store.component.html',
  providers: [TransactionService]
})
export class DrugDetailsComponent implements OnInit {
  parsedDrugDetails:any;
  drugInfoString: any = '';
  drugInfo!:Drugs;




  baseURL = 'gmail.com'

  rolesData!: LoginAllow;
  updateDrugForm!: FormGroup;
  loginData!: any;
  loginAllowList!: LoginAllow[];
  filteredRoles!: LoginAllow[];
  imageurl!: string;
  price!: string;
  category!: string;
  showUserEdit = true;
  name!: string;
  id!: any;
  admin!: AdminModel
  pickedUser!: Drugs
  public showPassword: boolean = false;
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private toastr: ToastrService, private iamService: IamService) {
    // initialize the filteredTransactions array with all transactions
  

  }

  ngOnInit(): void {






    // get the user data from the route arguement passed from the customer screen
    this.drugInfoString = this.route.snapshot.paramMap.get('drugInfo');
    console.log(this.drugInfoString)
    // parse the stringified data into a JSON object
    this.parsedDrugDetails =JSON.parse(this.drugInfoString);
    //pass parsed data to userTransactionInfo model
    this.drugInfo = this.parsedDrugDetails
    this.getUserInfo()



  }

// This function deletes all the data from the collection
deleteAllData() {
  this.iamService.emptyCollection().then(() => {
    console.log('Collection emptied successfully.');
  }).catch(error => {
    console.error('Error emptying collection:', error);
  });
}

update() {
  // Check if the form is invalid
  if (this.updateDrugForm.invalid) {
    // Show error message if form is invalid
    this.toastr.error('Invalid form data', 'Error', {
      timeOut: 3000,
    });
    return; // exit function early
  }
  // Construct email address from form data and baseURL


  this.name = this.adminRoleData['name'].value;
  this.category = this.adminRoleData['category'].value;

  // Create a new email object with email, password, role, and isActive properties
  const updateUser = this.pickedUser

  // Call the addLoginAllowData method from the iamService with the newEmail object
  this.iamService.update(this.pickedUser.id.toString(), updateUser)
    .then((value) => {

      // Show success message if admin is added successfully
      this.toastr.success('Admin added', `Success `, {
        timeOut: 3000,
      });
      // Reset the form after the success message is shown
   
    })
    .catch(error => console.log(error));

}



// This function deletes a user with the specified id
deleteUser() {

  this.iamService.deleteUser(this.id).then(() => {
    this.toastr.success('User has deleted', 'Success', {
      timeOut: 3000,
    });
  }).catch(error => {
    console.error(error);
  });
}






close() {
  this.showUserEdit = true;
}
getUserInfo() {

    this.showUserEdit = false;
  
    this.pickedUser = this.drugInfo
    console.log(this.pickedUser)
    this.updateDrugForm = this.formBuilder.group({
      drugname: this.pickedUser.productname,
      drugcategory: this.pickedUser.category,
      drugprice: this.pickedUser.price,
      drugimageurl: this.pickedUser.imageurl,
      drugdosageform: this.pickedUser.dosageform,
      drugcompanyname: this.pickedUser.companyname,
      drugid: this.pickedUser.id,
    });
  
}


get adminRoleData() { return this.updateDrugForm.controls; };





}
