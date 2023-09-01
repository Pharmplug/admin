import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import AdminModel from 'src/app/models/super.admin.mode';
import { DrugService } from '../../store/drug.service';
import Customer from 'src/app/models/user.model';



@Component({
  selector: 'app-user-transactions',
  templateUrl: './details-customer.component.html',
  providers: [DrugService]
})
export class CustomerDetailsComponent implements OnInit {
  parsedDrugDetails: any;
  userInfoString: any = '';
  userInfo!: Customer;
  updateDrugForm!: FormGroup;
  loginData!: any;
 
  imageurl!: string;
  price!: string;
  category!: string;
  showUserEdit = true;
  name!: string;
  id!: any;
  admin!: AdminModel
  pickedUser!: Customer
  public showPassword: boolean = false;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private toastr: ToastrService, private drugService: DrugService) {
    // initialize the filteredTransactions array with all transactions


  }

  ngOnInit(): void {






    // get the user data from the route arguement passed from the customer screen
    this.userInfoString = this.route.snapshot.paramMap.get('itemInfo');
    console.log(this.userInfoString)
    // parse the stringified data into a JSON object
    this.parsedDrugDetails = JSON.parse(this.userInfoString);
    //pass parsed data to userTransactionInfo model
    this.userInfo = this.parsedDrugDetails
    this.getUserInfo()



  }

  // This function deletes all the data from the collection
  deleteAllData() {

  }

  async update() {
    // Check if the form is invalid
    if (this.updateDrugForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }
    // Construct email address from form data and baseURL
    const data = {
      "price": this.drugData['drugprice'].value,
      "category": this.drugData['drugcategory'].value,
      "productname": this.drugData['drugname'].value,
      "id": this.drugData['drugid'].value,
      "dosageform": this.drugData['drugdosageform'].value,
      "companyname": this.drugData['drugcompanyname'].value,
      "imageurl": this.drugData['drugimageurl'].value,
      "productcode": this.drugData['drugproductcode'].value,
      "packsize": this.drugData['drugpacksize'].value
    }

    // Create a new email object with email, password, role, and isActive properties
    const updateDrug = data
    console.log(data)
    // Call the addLoginAllowData method from the iamService with the newEmail object
    var result = await this.drugService.update(updateDrug)

    console.log(result)
    this.toastr.success(`${result['data']['productname']} has been updated`, 'Success', {
      timeOut: 3000,
    });

  }



  // This function deletes a user with the specified id
  deleteUser() {


  }






  close() {
    this.showUserEdit = true;
  }
  getUserInfo() {

    this.showUserEdit = false;

    this.pickedUser = this.userInfo
    console.log(this.pickedUser)
    this.updateDrugForm = this.formBuilder.group({
    // firstName: this.pickedUser.firstName
    //   lastName: this.pickedUser.lastName
    //   drugprice: this.pickedUser.firstName
    //   drugimageurl: this.pickedUser.firstName
    //   drugdosageform: this.pickedUser.dosageform,
    //   drugcompanyname: this.pickedUser.firstName
    //   drugid: this.pickedUser.id,
    //   drugpacksize: this.pickedUser.firstName
    //   drugproductcode:this.pickedUser.firstName
    });

  }


  get drugData() { return this.updateDrugForm.controls; };





}
