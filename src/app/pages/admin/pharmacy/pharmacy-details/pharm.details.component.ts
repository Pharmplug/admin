import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PharmService } from '../pharmacy.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import AdminModel from 'src/app/models/super.admin.mode';
import PharmacyModel from 'src/app/models/pharmacy.model';



@Component({
  selector: 'app-user-transactions',
  templateUrl: './pharm.details.component.html',
  providers: [PharmService]
})
export class PharmDetailsComponent implements OnInit {
  parsedPharmDetails: any;
  pharmInfoString: any = '';
  pharmInfo!: PharmacyModel;
  updatePharmForm!: FormGroup;
  loginData!: any;

  imageurl!: string;
  price!: string;
  category!: string;
  showUserEdit = true;
  name!: string;
  id!: any;
  admin!: AdminModel
  pickedPharm!: PharmacyModel
  public showPassword: boolean = false;
  constructor(private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private pharmService: PharmService) {
    // initialize the filteredTransactions array with all transactions


  }

  ngOnInit(): void {






    // get the user data from the route arguement passed from the customer screen
    this.pharmInfoString = this.route.snapshot.paramMap.get('pharmInfo');
    console.log(this.pharmInfoString)
    // parse the stringified data into a JSON object
    this.parsedPharmDetails = JSON.parse(this.pharmInfoString);
    //pass parsed data to userTransactionInfo model
    this.pharmInfo = this.parsedPharmDetails
    this.getUserInfo()



  }

  // This function deletes all the data from the collection
  deleteAllData() {

  }

  async update() {
    // Check if the form is invalid
    if (this.updatePharmForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }
    // Construct email address from form data and baseURL

    const data = {
      "name": this.pharmData['name'].value,
      "city": this.pharmData['city'].value,
      "state": this.pharmData['state'].value,
      "address": this.pharmData['address'].value,
      "id": this.pharmData['id'].value,
      "status": this.pharmData['status'].value,
      "lat": this.pharmData['lat'].value,
      "lng": this.pharmData['lng'].value,
    }

    // Create a new email object with email, password, role, and isActive properties
    const updatePharm = data
    console.log(data)
    // Call the addLoginAllowData method from the iamService with the newEmail object
    var result = await this.pharmService.update(updatePharm)

    console.log(result)
    this.toastr.success(`${result['data']['productname']} has been updated`, 'Success', {
      timeOut: 3000,
    });

  }



  // This function deletes a user with the specified id
  async deleteProduct() {

    console.log(this.pickedPharm.id)
    // Call the addLoginAllowData method from the iamService with the newEmail object
    var result = await this.pharmService.deletePharmacy(this.pickedPharm.id)

    console.log(result)
    this.toastr.success(`${result['data']['name']} has been deleted`, 'Success', {
      timeOut: 3000,
    });

    this.router.navigate(['/admin/pharmacies']);

  }






  close() {
    this.showUserEdit = true;
  }
  getUserInfo() {

    this.showUserEdit = false;

    this.pickedPharm = this.pharmInfo
    console.log(this.pickedPharm)
    this.updatePharmForm = this.formBuilder.group({
      pharmName: this.pickedPharm.name,
      pharmAddress: this.pickedPharm.address,
      pharmState: this.pickedPharm.state,
      pharmCity: this.pickedPharm.city,
      pharmCreatedAt: this.pickedPharm.created_at,
      pharmId: this.pickedPharm.id,
      pharmLat: this.pickedPharm.lat,
      pharmLng: this.pickedPharm.lng,
    });

  }


  get pharmData() { return this.updatePharmForm.controls; };





}
