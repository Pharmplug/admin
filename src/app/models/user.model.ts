export default class Customer {
  id!: string;
  firstName!: string;
  lastName!: string;
  middleName!: string;
  address1!: string;
  address2!: string;
  city!: string;
  country!: any;
  authType!:any;
  dateOfBirth!: string;
  email!: string;
  phone?: any;
  state!: string;
  zip!: string;
  registration_date:any;
  idVerified!:boolean;
  gender!: string;
  status!: string;
  kycStatus!: string;
  stellar_address!: any;
  maximumDeposit!: string;
  maximumWithdrawal!: string;
  maximumPayment!: string;
  reason!: string;
  domain!:any;
  fcmToken!:any
  firebasePath!:any;
  deviceInfo:any;
  isCheckbookLinked!:any;
}