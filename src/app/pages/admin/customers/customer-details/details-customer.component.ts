import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../customers.service';
import FacePhi from 'src/app/models/facePhi.model';
import UserPrivateData from 'src/app/models/userPrivateData';
import { DomSanitizer } from '@angular/platform-browser';
import Customer from 'src/app/models/user.model';
import Kyc from 'src/app/models/kyc.model';
import WalletData from 'src/app/models/wallets.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-pages-contact',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css'],
  providers: [UserService]
})



export class CustomerDetailsComponent implements OnInit {
  public id!: any;
  verticalycentered: any;
  userInfoString!: any;
  imageSrc!: string;
  facePhiCollection!: FacePhi;
  user!: Customer;
  userKyc!: Kyc;
  returnData: any;
  docImageUrl: any
  userData!: UserPrivateData;
  userInfo: any
  wallet!: WalletData;
  getDate!: string
  imageSource: any;
  sanitizer: any;
  facePhiInfo: any;
  imageUrl: any;
  isAccountActive = true;
  name!: string;
  email!: string;
  userStatus: any;
  userStatusname: any;
  statusForm!: FormGroup;
  success = '';
  submitted = false;
  statusDiv = false;
  userKycStatus: any;
  userStatusCode: any;
  kycStatusDiv = false;
  public loader: boolean = true;
  privateCollection: any;



  
  constructor(private route: ActivatedRoute, private userService: UserService, public _sanitizer: DomSanitizer, private formBuilder: FormBuilder, private toastr: ToastrService) {

  }


  ngOnInit() {}

//     this.loader = true;

//     // get the user data from the route arguement passed from the customer screen
//     this.userInfoString = this.route.snapshot.paramMap.get('userInfo');
//     // parse the stringified data into a JSON object
//     this.userInfo = JSON.parse(this.userInfoString);
//     // get the id from the user object
//     this.id = this.userInfo.id;
//     this.userStatusCode
//     //get the user data from the userInfo object
//     this.user = this.userInfo;
// console.log(this.user);
//     /**
//      * Initialize functions
//      */
//     this.getFacePhiData();
//     this.getUserPrivateData();
//     this.viewIdDocument(0);
//     this.name;
//     this.facePhiCollection;




//   }

//   getUserPrivateData = async () => {
//     // this.userKyc = this.userInfo;
//     // // convert user registration date to readable format
//     // this.getDate = this.convertToDateTime(this.user.registration_date['seconds'])
//     // //get user id snapshot from user data collection
//     // const userSnapshot = await this.userService.getPrivateData(this.id);
//     // //sort through the data by user id
//     // userSnapshot.forEach((doc: any) => {
//     //   this.userData = doc.data();

//     //   this.userKyc = this.userInfo;


//     //    //convert base64 string to profile photo
//     //    this.imageUrl = this.convertToImage(this.userData.bestImage);
//     //    this.docImageUrl = this.convertToImage(this.userData.frontDocumentImage);
 
//     //   if (this.isAccountActive != true) {
//     //     this.userStatusCode = this.user.status;
//     //   } else {
//     //     this.userStatusCode = this.user.status;
//     //   }

//     //   if (Number(this.user.status) < 1) {
//     //     this.isAccountActive = false
//     //   } else {
//     //     this.isAccountActive = true
//     //   }
//     //   this.statusForm = this.formBuilder.group({
//     //     status: [this.user.status, [Validators.required]],
//     //     maximumDeposit: [this.user.maximumDeposit, [Validators.required]],
//     //     maximumWithdrawal: [this.user.maximumWithdrawal, [Validators.required]],
//     //     maximumPayment: [this.user.maximumPayment, [Validators.required]],
//     //     reason: [this.user.reason, [Validators.required]]
//     //   });
//     //   this.loader = false;
//     // });
//   }


//   viewIdDocument = (value: Number) => {
//     if (value === 0) {
//       this.docImageUrl = this.convertToImage(this.userData.frontDocumentImage);

//     } else if (value === 1) {
//       this.docImageUrl = this.convertToImage(this.userData.backDocumentImage);

//     }
//   }
//   convertToImage(base64Img: any) {
//     const img = new Image();
//     img.src = `data:image/jpeg;base64,${base64Img}`;
  
//     return img.src;
//   }



//   get statusF() { return this.statusForm.controls; }


//   getFacePhiData = async () => {
//     // //get user id snapshot from user data collection
//     // const snapshot2 = await this.userService.getfacePhiDataCollection(this.id);
//     // //sort through the data by user id
//     // snapshot2.forEach((doc: any) => {
    
//     //   this.facePhiInfo = doc.data();
//     //   this.facePhiCollection = this.facePhiInfo;
   
//     // });
//   }

//   //sfbUYR4MqncdQDGBl7K9Lmei65t2

//   convertToDateTime(unixTs: any) {
//     const unixTimestampSecs = unixTs;
//     // Convert seconds to milliseconds
//     const unixTimestampMs = unixTimestampSecs * 1000;

//     // Create a new Date object with the Unix timestamp in milliseconds
//     const dateObj = new Date(unixTimestampMs);

//     // Get the year, month, day, hour, minute, second, and millisecond values from the Date object
//     const year = dateObj.getFullYear();
//     const month = dateObj.getMonth() + 1;
//     const day = dateObj.getDate();
//     const hour = dateObj.getHours();
//     const minute = dateObj.getMinutes();
//     const second = dateObj.getSeconds();

//     // Format the date and time string
//     const dateTimeString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
//     return dateTimeString

//   }





//   onSubmit() {
// //     if (this.statusForm.invalid) {
// //       this.toastr.error('Invalid form data', 'Error', {
// //         timeOut: 3000,
// //       });
// //     } else {


// //       if (this.isAccountActive != true) {
// //         this.userStatusCode = 0;
// //       } else {
// //         this.userStatusCode = 1;
// //       }


// //       const data = {
// //         kycStatus: this.userStatusCode.toString(),
// //         status: this.userStatusCode.toString(),
// //         maximumDeposit: this.statusF['maximumDeposit'].value,
// //         maximumWithdrawal: this.statusF['maximumWithdrawal'].value,
// //         maximumPayment: this.statusF['maximumPayment'].value,
// //         reason: this.statusF['reason'].value
// //       };
// // console.log(data)
// //       if (this.id) {

// //         this.userService.update(this.id, data)
// //           .then((value) => {
// //             console.log(value)
// //             this.toastr.success('User data updated successfully', 'Success', {
// //               timeOut: 3000,
// //             });

// //           }


// //           )
// //           .catch(err => {

// //             this.toastr.error(err, 'Error', {
// //               timeOut: 3000,
// //             });
// //           });


// //      }
//   //  }
//  }




 }
