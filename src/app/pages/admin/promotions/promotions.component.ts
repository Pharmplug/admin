import { Component, OnInit, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { PromotionsService } from './promotions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import SettingsModel from 'src/app/models/settings.model';
import Promotions from 'src/app/models/promotions';
import { TimeStamp } from 'src/app/shared/time.stamp.converter';
import { UserService } from '../customers/customers.service';
import Customer from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Quill from 'quill';
import { FileUpload } from 'src/app/models/file-upload';
import { Location } from '@angular/common';


interface ListItem {
  icon: string;
  title: string;
  subtitle: string;
  textEnd: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
  providers: [PromotionsService]
})
export class PromotionsComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fcmImage: any = ""
  promoForm!: FormGroup;
  fcmForm!: FormGroup;
  submitted = false;
  settingsModel!: SettingsModel;
  id: any;
  frequencyValue: number = 0;
  loginLogs: any;
  promo: any;
  parts: any
  selectedItems: any[] = []; // Array to store selected items
  users_count!: Number;
  total_deposit!: string;
  total_withdrawal!: string;
  kyc_count!: Number;
  itemList: any
  getToken!: any;
  mobjects: any;
  promoModel!: Promotions[]
  validPromo!: Promotions[]
  recipients: Customer[] = [];
  quill!: any
  selectedImage: boolean = true
  allFcmTokens!: any
  searchTerm!: string;
  constructor(private location: Location, private cdr: ChangeDetectorRef, private userService: UserService, private elementRef: ElementRef, private promotionsService: PromotionsService,
    public http: HttpClient,
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {



    this.selectedImage == false;

    //this.deleteAllData()
    this.promotionsService.getAll().valueChanges().subscribe((promotions: any) => {
      console.log(promotions);

      this.promoModel = promotions
      type FormattedDate = {
        seconds: number;
        nanoseconds: number;
      };
      this._fetchUsersData()
      const now = Date.now();
      const seconds = Math.floor(now / 1000);
      const nanoseconds = (now % 1000) * 1_000_000;

      const formattedDate: FormattedDate = {
        seconds,
        nanoseconds,
      };

      console.log(formattedDate);

      this.validPromo = this.promoModel.filter(p => {
        const promoEndDate = p.promoEndDate as FormattedDate; // type assertion
        return (promoEndDate.seconds > formattedDate.seconds) ||
          (promoEndDate.seconds === formattedDate.seconds && promoEndDate.nanoseconds > formattedDate.nanoseconds);
      });

      console.log(this.validPromo, formattedDate);


    });

    // Assign the form controls with the values retrieved from the database
    this.promoForm = this.formBuilder.group({

      promoName: ["", [Validators.required]],
      promoCode: ["", [Validators.required]],
      adType: ["", [Validators.required]],
      promoValue: ["", [Validators.required]],
      minTransferAmount: ["", [Validators.required]],
      promoFrequency: [""],
      promoStartDate: [""],
      promoEndDate: [""],
      promoCodeExpiryDate: [""],

    });
    this.promoForm.get('promoFrequency')!.valueChanges.subscribe(value => {
      this.frequencyValue = value;
    });

    this.fcmForm = this.formBuilder.group({

      header: ["", [Validators.required]],
      body: ["", [Validators.required]]

    });
  }


  // Getter for easy access to the form controls
  get formcontrols() {
    return this.promoForm.controls;
  }
  get fcmFormControls() {
    return this.fcmForm.controls;
  }

  // Function to get the form data
  getFormData() {
    var _adType = ''
    if (this.formcontrols['adType'].value === '1') {

      _adType = 'Discount'
    } else if (this.formcontrols['adType'].value === '2') {
      _adType = 'Gift'
    }
    return {
      promoName: this.formcontrols['promoName'].value,
      promoCode: this.formcontrols['promoCode'].value,
      adType: _adType,
      promoValue: this.formcontrols['promoValue'].value,
      minTransferAmount: this.formcontrols['minTransferAmount'].value,
      promoFrequency: this.formcontrols['promoFrequency'].value,
      promoStartDate: TimeStamp.fromDateString(this.formcontrols['promoStartDate'].value),
      promoEndDate: TimeStamp.fromDateString(this.formcontrols['promoEndDate'].value),
      promoCodeExpiryDate: TimeStamp.fromDateString(this.formcontrols['promoCodeExpiryDate'].value),
      promoUsedCount: "0"
    };
  }

  // Function to get the form data
  getFcmFormData() {

    return {
      header: this.fcmFormControls['header'].value,
      body: this.fcmFormControls['body'].value,


    };
  }
  // Function to check if the form is valid
  isFcmFormValid() {
    if (this.fcmForm.invalid) {
      return false;
    }
    return true;
  }
  // Function to check if the form is valid
  isFormValid() {
    if (this.promoForm.invalid) {
      return false;
    }
    return true;
  }
  // Function to update the settings in the database
  async addPromo(formData: any) {
    try {
      await this.promotionsService.addpromoData(formData).then(() => {
        // Show a success toast notification
        this.showSuccessToast();
      });

      this.promotionsService.getAll().valueChanges().subscribe((promotions: any) => {
        console.log(promotions);
      });
    } catch (error) {
      // Show an error toast notification
      this.showErrorToast(error);
    }
  }
  onSubmit() {
    const formData = this.getFormData();
    if (this.isFormValid()) {
      console.log(formData)
      // Call the updateSettings function to update the settings in the database
      this.addPromo(formData);
    }
  }
  // Function to show a success toast notification
  showSuccessToast() {
    this.toastr.success('Promo code has been generated', 'Success', {
      timeOut: 3000,
    });
  }

  // Function to show an error toast notification
  showErrorToast(error: any) {
    this.toastr.warning(error.toString(), 'Error', {
      timeOut: 3000,
    });
  }

  convertTimeStamp(data: any) {
    const timestamp = new Date(0);
    timestamp.setUTCSeconds(data.seconds);
    timestamp.setUTCMilliseconds(data.nanoseconds / 1000000);
    const formattedDate = timestamp.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
    return formattedDate;

  }

  // This function deletes all the data from the collection
  deleteAllData() {
    this.promotionsService.emptyCollection().then(() => {
      console.log('Collection emptied successfully.');
    }).catch(error => {
      console.error('Error emptying collection:', error);
    });
  }




  getProgressWidth(startDate: { seconds: number; nanoseconds: number }, endDate: { seconds: number; nanoseconds: number }): number {
    const totalDuration = (endDate.seconds * 1000 + endDate.nanoseconds / 1000000) - (startDate.seconds * 1000 + startDate.nanoseconds / 1000000);
    const remainingTime = (endDate.seconds * 1000 + endDate.nanoseconds / 1000000) - Date.now();
    const progress = (totalDuration - remainingTime) / totalDuration;
    return Math.round(progress * 100);
  }



  _fetchUsersData() {
    this.userService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map((users: any[]) =>
        users.filter((user: any) => user.kycStatus
          === '1')
      )
    ).subscribe(data => {
      // data now contains only the users where idVerified is true
      this.recipients = data;
      const hasToken = this.recipients.filter((mUser: any) => mUser.fcmToken != null || mUser.fcmToken != undefined)
      console.log(this.recipients)
      this.allFcmTokens = hasToken.map(obj => obj.fcmToken);
    });
  }



  // logUser(event:any,token: any) {
  //   if (event.target.checked) {
  //     this.getToken = token;
  //   } else {
  //     this.getToken = null;
  //   }
  // }

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
      this.selectedItems = [...this.recipients];
      this.getToken = this.allFcmTokens
      console.log(this.getToken)
    } else {
      this.selectedItems = [];
      this.getToken = [];
      console.log(this.selectedItems)
    }
  }

  isAllSelected(): boolean {
    return this.selectedItems.length === this.recipients.length;
  }

  async sendNotification(title: string, body: string, token: any) {

    var payload = {}
    if (Array.isArray(token)) {
      payload = {
        notification: {
          title,
          body,
          image: this.fcmImage
        },
        registration_ids: token
      };
      console.log(payload)
    } else {

      payload = {
        notification: {
          title,
          body,
          image: this.fcmImage
        },
        to: token
      };
      console.log(payload)
    }


    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${environment.firebaseConfig.serverKey}`
    };
    try {
      const res: any = this.http.post('https://fcm.googleapis.com/fcm/send', payload, { headers }).toPromise();
      console.log(res)


    } catch (error) {
      console.error(error);
    }

  }




  sendFCM() {
    const fcmFormData = this.getFcmFormData();
    if (this.isFcmFormValid()) {


      if (this.getToken === undefined || this.getToken === '') {
        this.toastr.warning('Select receiver(s)', 'Error', {
          timeOut: 3000,
        });
      } else {
        try {
          this.sendNotification(fcmFormData['header'], fcmFormData['body'], this.getToken);
          this.toastr.success('Message Sent', 'Success', {
            timeOut: 3000,
          });
          const fileInput: HTMLInputElement | null = document.querySelector('#formFile');
          if (fileInput) {
            fileInput.value = ''; // Reset the value to empty
            this.fcmForm.reset()
            this.percentage =0
          }
        } catch (error) {
          this.toastr.warning('Sending failed', 'Error', {
            timeOut: 3000,
          });
        }
      }
    }
  }


  searchUser(query: any,) {
    // Perform user search logic here, based on the provided query
    // You can filter the `items` array using the query to display the matching users
    // For example:
    if (this.searchTerm === '') {
      this._fetchUsersData();
    } else {
      this.recipients = this.recipients.filter((item: Customer) => item.firstName.toLowerCase().includes(query.target.value.toLowerCase()));
    }

  }


  // getQuillInput() {
  //   this.quill.on('text-change', () => {
  //     const contents = this.quill.getContents();
  //     this.parts = [];
  //     let currentPart = { text: '', formats: {} };
  //     contents.ops.forEach((op: any) => {
  //       if (op.insert) {
  //         const text = op.insert;
  //         const formats = op.attributes || {};
  //         if (JSON.stringify(currentPart.formats) === JSON.stringify(formats)) {
  //           currentPart.text += text;
  //         } else {
  //           this.parts.push(currentPart);
  //           currentPart = { text: text, formats: formats };
  //         }
  //       }
  //     });
  //     this.parts.push(currentPart);

  //   });
  // }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {

   
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.promotionsService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);

            this.fcmImage = localStorage.getItem('fcmImg');
            this.selectedImage == true;

          
              this.selectedImage == true;
              this.toastr.info('Image has been attached, select recipent(s) and send' , 'Done', {
                timeOut: 3000,
              });
            
          },

          error => {
            console.log(error);
          }

        );
      }

    }


  }


}



