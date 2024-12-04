import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DrugService } from '../drug.service'
import Drugs from 'src/app/models/drugs.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import AdminModel from 'src/app/models/super.admin.mode';



@Component({
  selector: 'app-user-transactions',
  templateUrl: './drug.store.component.html',
  providers: [DrugService]
})
export class DrugDetailsComponent implements OnInit {
  parsedDrugDetails: any;
  drugInfoString: any = '';
  drugInfo!: Drugs;
  updateDrugForm!: FormGroup;
  loginData!: any;
  showLoadingButton: boolean = true;
  showLoadingDeleteButton: boolean = true;
  imageurl!: string;
  price!: string;
  category!: string;
  showUserEdit = true;
  name!: string;
  id!: any;
  admin!: AdminModel
  pickedUser!: Drugs
  public showPassword: boolean = false;
  constructor(private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private drugService: DrugService) {
    // initialize the filteredTransactions array with all transactions


  }

  ngOnInit(): void {






    // get the user data from the route arguement passed from the customer screen
    this.drugInfoString = this.route.snapshot.paramMap.get('drugInfo');
    console.log(this.drugInfoString)
    // parse the stringified data into a JSON object
    this.parsedDrugDetails = JSON.parse(this.drugInfoString);
    //pass parsed data to userTransactionInfo model
    this.drugInfo = this.parsedDrugDetails
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


    if ( this.drugData['drugprice'].value===""||this.drugData['drugcategory'].value===""|| this.drugData['drugname'].value===""||this.drugData['drugid'].value===""|| this.drugData['drugdosageform'].value===""||  this.drugData['drugcompanyname'].value===""|| this.drugData['drugimageurl'].value===""|| this.drugData['drugproductcode'].value===""|| this.drugData['drugpacksize'].value==="") {
      // Show error message if form is invalid
      this.toastr.error('All fields must be provided', 'Error', {
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
    this.showLoadingButton = false
    // Call the addLoginAllowData method from the iamService with the newEmail object
    var result = await this.drugService.update(updateDrug)

    console.log(result)
    this.toastr.success(`${result['data']['productname']} has been updated`, 'Success', {
      timeOut: 3000,
    });
    this.showLoadingButton = true
  }



  // This function deletes a user with the specified id
  async deleteProduct() {

    this.showLoadingDeleteButton = false
    console.log(this.pickedUser.id)
    // Call the addLoginAllowData method from the iamService with the newEmail object
    var result= await this.drugService.deleteProduct(this.pickedUser.id)

    console.log(result)
    this.toastr.success(`${result['data']['productname']} has been deleted`, 'Success', {
      timeOut: 3000,
    });
    this.showLoadingDeleteButton = true
    this.router.navigate(['/admin/store']);

  }






  close() {
    this.showUserEdit = true;
  }
  getUserInfo() {

    this.showUserEdit = false;

    this.pickedUser = this.drugInfo
    console.log(this.pickedUser)
    this.updateDrugForm = this.formBuilder.group({
      drugname: this.pickedUser.product_name,
      drugcategory: this.pickedUser.category,
      drugprice: this.pickedUser.price,
      drugimageurl: this.pickedUser.image_url,
      drugdosageform: this.pickedUser.dosage_form,
      drugcompanyname: this.pickedUser.company_name,
      drugid: this.pickedUser.id,
      drugpacksize: this.pickedUser.pack_size,
      drugproductcode: this.pickedUser.product_code,
    });

  }


  get drugData() { return this.updateDrugForm.controls; };


}
