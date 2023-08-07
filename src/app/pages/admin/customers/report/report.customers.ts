import { Component, Inject } from "@angular/core";
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { PdfGeneratorService } from 'src/app/shared/pdf-generate/pdf-generator.service';
import { DatePipe } from '@angular/common';
import { map } from "rxjs";
import { UserService } from "../customers.service";
import Customer from "src/app/models/user.model";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'report-dialog',
  templateUrl: 'report.customers.html',
  styleUrls: ['./report.customers.css'],
  providers: [DatePipe]
})
export class CustomersReportDialog {
  allUsers: Customer[] = [];
  dateUsers=0;
  users: Customer[] = [];
  constructor(@Inject(DIALOG_DATA) public data: any, private toastr: ToastrService, private pdfGenerate: PdfGeneratorService, private userService: UserService, private datePipe: DatePipe) { }
  order: any = [];
  orderPDF: any = [];
  option1!: any
  userdata: any
  toppings = ['Id', 'Date', 'Name', 'Email', 'Phone', 'Stellar Address', 'Transaction Amount', 'Fee', 'Net Amount', 'Transaction Type'];
  // heads:any = ['id', 'token_amount', 'refunded', 'email_status', 'name', 'amount_fee', 'amount_net', 'Date'];
  startDate!: string; // Variable to store the start date
  endDate!: string; // Variable to store the end date

  heads: any = [
    "id",
    "registration_date",
    "firstName",
    "middleName",
    "lastName",
    "phone",
    "country",
    "gender",
    "dateOfBirth",
    "email",
    "monthlyTransactionCount",
    "myReferralCode",
    "occupation",
    "phoneCode",
    "reason",
    "referredBy",
    "rewards",
    "totalAmount",
    "yearlyTransactionCount"
  ];
  filteredHeads: any = [
    "User Id",
    "Registration Date",
    "First Name",
    "Middle Name",
    "Last Name",
    "Phone",
    "Country",
    "Gender",
    "Date Of Birth",
    "Email",
    "MonthlyTransactionCount",
    "Referral Code",
    "Occupation",
    "Phone Code",
    "reason",
    "Referred By",
    "Rewards",
    "Total Amount",
    "Yearly TransactionCount"
  ];
  allHeads = [
    "authType",
    "businessId",
    "cashBack",
    "country",
    "dateOfBirth",
    "defaultAccount",
    "docuPassVerified",
    "domain",
    "e_Sign_Date",
    "e_Sign_fullName",
    "email",
    "fcmToken",
    "firebasePath",
    "firstName",
    "gender",
    "id",
    "idType",
    "idUrl",
    "idUrl1",
    "idVerified",
    "inviteFriend",
    "isBusiness",
    "isCheckbookLinked",
    "isCodeApplied",
    "isDeleted",
    "isDuplicate",
    "isFirstDeposit",
    "kycStatus",
    "lastName",
    "maximumDeposit",
    "maximumPayment",
    "maximumWithdrawal",
    "middleName",
    "monthlyTransactionCount",
    "myReferralCode",
    "occupation",
    "phone",
    "phoneCode",
    "ppic",
    "ppicDownloadUrl",
    "reason",
    "referredBy",
    "registration_date",
    "rewards",
    "silaAccountState",
    "status",
    "stellar_address",
    "tempo_SenderId",
    "totalAmount",
    "yearlyTransactionCount"
  ];
  ngOnInit() {
    this._fetchusers()
    this.option1
    this.filterUsers('1')
  }

  addToOrder(item: any) {
    const index = this.order.indexOf(item);
    if (index > -1) {
      this.order.splice(index, 1);
    } else {
      this.order.push(item);
    }
  }
  addToOrderPDF(item: any) {
    const index = this.orderPDF.indexOf(item);
    if (index > -1) {
      this.orderPDF.splice(index, 1);
    } else {
      this.orderPDF.push(item);
    }
  }

  resetOrder() {
    this.order = [];
  }
  resetOrderPDF() {
    this.orderPDF = [];
  }
  filterUsersByDays(days: number) {
    // Calculate the start date for the filter
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);
    console.log(startDate)
    this.userdata = []
    // Filter the users by the start date and assign the filtered users to the filteredusers property
    this.userdata = this.allUsers.filter((user: any) => new Date(user.registration_date.toMillis()) >= startDate);

    console.log(this.userdata)

  }

  filterUsersByCustomDate() {

  }


  generateReport() {
    console.log(this.users)
    this.pdfGenerate.exportToCustomerExcel(this.users, this.heads, this.filteredHeads);
  }


  _fetchusers() {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.allUsers = data;
      this.allUsers.forEach((muser: any) => {
        const registrationTimestamp = muser.registration_date;
        const dateOfBirth = muser.dateOfBirth;
        console.log(dateOfBirth);
        const registrationDate = new Date(registrationTimestamp.seconds * 1000 + registrationTimestamp.nanoseconds / 1000000);
        const formattedRegistrationDate = this.datePipe.transform(registrationDate, 'dd MMMM yyyy');
        muser.registration_date = formattedRegistrationDate;
        if (muser.dateOfBirth == null) {
          muser.dateOfBirth = "No date of birth available"
        } else {
          muser.dateOfBirth = this.convertDateFormat(dateOfBirth);
        }
      });
      console.log(this.allUsers);
      this.users = this.allUsers;
    });
  }



  filterUsers(type: string) {
    console.log(type)
    if (type === "1") {
      this.users = this.allUsers.filter(user => user.kycStatus === type)
      console.log(this.users)

    } else if (type === "0") {
      this.users = this.allUsers.filter(user => user.kycStatus === type || undefined || null || "")
      console.log(this.users)

    }
  }

  convertDateFormat(dateString: string): string {
    let formattedDate: string;
    if (dateString.includes('/')) {
      // Date format: 24/06/1962
      const parts = dateString.split('/');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      formattedDate = `${day} ${this.getMonthName(parseInt(month))} ${year}`;
    } else {
      // Date format: 2000/07/17
      const date = new Date(dateString);
      formattedDate = `${date.getDate()} ${this.getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`;
    }
    return formattedDate;
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
  }

  logFormattedStartDate() {
    const today = new Date();

    const selectedStartDate = new Date(this.startDate);

    if (selectedStartDate<= today) {

    } else {
      this.toastr.warning('End date cannot be greater than today', 'Error', {
        timeOut: 3000,
      });
      this.startDate=''
    } 
  }
  logFormattedDate() {
  
    const today = new Date();
    const selectedEndDate = new Date(this.endDate);
    const selectedStartDate = new Date(this.startDate);
    console.log(today,selectedEndDate);
    if (selectedEndDate <= today && selectedStartDate< today) {
      this.users = this.allUsers.filter(user => {
        const userDate = new Date(user.registration_date); // Assuming registration_date is in the format "05 July 2023"
        const startDate = new Date(this.startDate);
  
        return userDate >= startDate && userDate <= selectedEndDate;
      });
  
      console.log(this.users);
      this.dateUsers=this.users.length
    } else {
      this.toastr.warning('End date cannot be greater than today', 'Error', {
        timeOut: 3000,
      });
      this.endDate=''
    }
  }
  



}