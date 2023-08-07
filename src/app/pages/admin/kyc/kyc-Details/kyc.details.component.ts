import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Customer from 'src/app/models/user.model';
import { UserService } from '../../customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import FacePhi from 'src/app/models/facePhi.model';
import Kyc from 'src/app/models/kyc.model';
import UserPrivateData from 'src/app/models/userPrivateData';
import { KycService } from '../kyc.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kyc-details',
  templateUrl: './kyc.details.component.html',
  styleUrls: ['./kyc.details.component.css'],
  providers: [UserService]
})
export class KYCDetailsComponent implements OnInit {
  public id!: any;
  userInfoString!: any;
  imageSrc!: string;
  facePhiCollection!: FacePhi;
  user!: Customer;
  returnData: any;
  userKyc!: Kyc;
  docImageUrl: any
  userData!: UserPrivateData;
  userInfo: any
  getDate!: string
  imageSource: any;
  sanitizer: any;
  facePhiInfo?: any;
  imageUrl: any;
  privateData!: any;
  constructor(private route: ActivatedRoute, private userService: UserService, public _sanitizer: DomSanitizer, private toastr: ToastrService) {

  }


  ngOnInit() {
    // get the user data from the route arguement passed from the customer screen
    this.userInfoString = this.route.snapshot.paramMap.get('userInfo');
    // parse the stringified data into a JSON object
    this.userInfo = JSON.parse(this.userInfoString);
    // get the id from the user object
    this.id = this.userInfo.id;
    //this.id = this.facePhiInfo.id;

    //get the user data from the userInfo object
    this.user = this.userInfo;

    this.userKyc = this.userInfo;

console.log(this.userInfo.id)

    //console.log("new_use", this.user)

    //console.log(this.userInfo)
    /**
     * Initialize functions
     */

    this.getFacePhiData();
    this.getPrivateData();
    this.viewIdDocument(0);
  

  }




  viewIdDocument = (value: Number) => {
    if (value === 0) {
      this.docImageUrl = this.convertToImage(this.userData.frontDocumentImage);

    } else if (value === 1) {
      this.docImageUrl = this.convertToImage(this.userData.backDocumentImage);

    }
  }
  convertToImage(base64Img: any) {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64Img}`;
    return img.src;
  }

  getFacePhiData = async () => {
    //get user id snapshot from user data collection
    const snapshot2 = await this.userService.getfacePhiDataCollection(this.id);
    //sort through the data by user id
    snapshot2.forEach((doc: any) => {
      this.facePhiInfo = doc.data();
      this.facePhiCollection = this.facePhiInfo;
      console.log(this.facePhiCollection)
    });
  }

  getPrivateData = async () => {
    // convert user registration date to readable format
    this.getDate = this.convertToDateTime(this.user.registration_date['seconds'])
    //get user id snapshot from user data collection
    const userSnapshot = await this.userService.getPrivateData(this.id);
    //sort through the data by user id
    userSnapshot.forEach((doc: any) => {

      this.userData = doc.data();
      console.log(this.userData)
      this.userKyc = this.userInfo;

      //convert base64 string to profile photo
      this.imageUrl = this.convertToImage(this.userData.bestImage);
      this.docImageUrl = this.convertToImage(this.userData.frontDocumentImage);

    });
  }




  convertToDateTime(unixTs: any) {
    const unixTimestampSecs = unixTs;
    // Convert seconds to milliseconds
    const unixTimestampMs = unixTimestampSecs * 1000;

    // Create a new Date object with the Unix timestamp in milliseconds
    const dateObj = new Date(unixTimestampMs);

    // Get the year, month, day, hour, minute, second, and millisecond values from the Date object
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();

    // Format the date and time string
    const dateTimeString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return dateTimeString

  }


}
