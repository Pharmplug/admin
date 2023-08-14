import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Recipient from 'src/app/models/request.model';
import { RequestService } from '../request.service';



@Component({
  selector: 'app-pages-user-transactions',
  templateUrl: './requests.info.component.html',
})
export class RequestInfoComponent implements OnInit {
  parsedRequestDetails:any;
  requestInfoString: any = '';
  pickedUser!: Recipient;
  updateRequestForm!: FormGroup;
  userRequestInfo!: Recipient;
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,public http: HttpClient, private toastr: ToastrService,private requestService:RequestService) {
    // initialize the filteredTransactions array with all transactions
  

  }

  ngOnInit(): void {
    // get the user data from the route arguement passed from the customer screen
    this.requestInfoString = this.route.snapshot.paramMap.get('requestInfo');
    // parse the stringified data into a JSON object
    this.parsedRequestDetails =JSON.parse(this.requestInfoString);
    //pass parsed data to userTransactionInfo model
    this.userRequestInfo = this.parsedRequestDetails
    console.log(this.userRequestInfo)
    // pass parsed data to ipConfig datatype
   this. getUserInfo()
  }

  getUserInfo() {

  
    this.pickedUser =  this.userRequestInfo
    console.log(this.pickedUser)

    
    this.updateRequestForm = this.formBuilder.group({
      status: this.pickedUser.status,
      customername:this.pickedUser.customername,
      phone:this.pickedUser.phone,
      items:this.pickedUser.items,
      price:this.pickedUser.price,
      deliverytype:this.pickedUser.deliverytype,
      created_at:this.pickedUser.created_at,
      ref:this.pickedUser.ref,
      customerlocation:this.pickedUser.customerlocation,
      id: this.pickedUser.id,
    });


    
  
}
async update() {
  // Check if the form is invalid
  if (this.updateRequestForm.invalid) {
    // Show error message if form is invalid
    this.toastr.error('Invalid form data', 'Error', {
      timeOut: 3000,
    });
    return; // exit function early
  }
  // Construct email address from form data and baseURL

let getStatus = this.requestData['status'].value
switch (parseInt(this.requestData['status'].value)) {
  case 0:
    getStatus = "new";
    break;
  case 1:
    getStatus = "pending";
    break;
  case 2:
    getStatus = "ready";
    break;
  case 3:
    getStatus = "delivered";
    break;
  default:
    getStatus = "new";
}
  const data ={

  // "customerlocation": this.requestData['customerlocation'].value,
  // "customername": this.requestData['customername'].value,
  // "deliverytype": this.requestData['deliverytype'].value,
  "id": this.requestData['id'].value.toString(),
//   "items": this.requestData['items'].value,
//  "phone" : this.requestData['phone'].value,
//   "price" :this.requestData['price'].value,
//   "ref" :this.requestData['ref'].value,
  "status": getStatus

  }

  // Create a new email object with email, password, role, and isActive properties
  console.log(data)
  // Call the addLoginAllowData method from the iamService with the newEmail object
  var result = await this.requestService.update(data)
  console.log(result)
  this.toastr.success(`${result} has been updatd`, 'Success', {
    timeOut: 3000,
  });

}

get requestData() { return this.updateRequestForm.controls; };


}
