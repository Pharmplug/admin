import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { MarketService } from './markets.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import RateLogs from 'src/app/models/rate.model';
import moment from 'moment-timezone';

@Component({
  selector: 'app-settings',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  providers: [MarketService]
})
export class MarketComponent implements OnInit, AfterViewInit {
  addRateForm!: FormGroup;
  selectedCountry: any
  updateRateForm!: FormGroup;
  rateList!: RateLogs[];
  filteredCountry: any
  currentDate:any
  estDateTime:any
  constructor(private marketService: MarketService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  // Initializes component on load
  ngOnInit() {
    this._fetchData();
    this.addRateForm = this.formBuilder.group({
      country: [''],
      symbol: [''],
      rate: ['']
    });

    //this.deleteAllData()
  }

  ngAfterViewInit(): void {
    this.updateRateForm = this.formBuilder.group({
      newRate: [''], // Add other form controls as needed
    });
    this. currentDate = moment.utc();

    // Convert to Eastern Standard Time (EST)
  this. estDateTime =this. currentDate.tz('America/New_York').format('YYYY-MM-DDTHH:mm:ss');
  }
  // This function fetches all the data from the collection and subscribes to the changes
  _fetchData() {
    this.marketService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      // Stores the fetched data into loginAllowList
      this.rateList = data
      console.log(this.rateList);

    });
  }

  // This function filters the roles in the loginAllowList and stores them in filteredRoles
  getCountryRate(country: string): void {

    // Checks if loginAllowList is not null or undefined
    if (!this.rateList) {
      console.error('loginAllowList is undefined or null.');
      return;
    }

    // Filters the roles in the loginAllowList and stores them in filteredRoles
    this.filteredCountry = this.rateList.filter((data: any) => data.role !== country);
    console.log(this.filteredCountry);
  }

  get rateData() { return this.addRateForm.controls; }
  get updateRateData() { return this.updateRateForm.controls; }


  // This function deletes all the data from the collection
  deleteAllData() {
    this.marketService.emptyCollection().then(() => {
      console.log('Collection emptied successfully.');
    }).catch(error => {
      console.error('Error emptying collection:', error);
    });
  }

  update(i: any) {
    // Check if the form is invalid
    if (this.updateRateForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }
    // Construct email address from form data and baseURL

    var newRate = this.updateRateData['newRate'].value;

    console.log(newRate + 'ii')
    if (newRate != null) {
      var id: any = this.rateList[i].id;
    }
   

 
    console.log(this.rateList[i].id)
 

    this.rateList[i].history.push({ rate: newRate, date_time: this.estDateTime})
    this.marketService.update(id, this.rateList[i])
      .then(() => {

        // Show success message if admin is added successfully
        this.toastr.success(`${this.rateList[i].country} rate update`, `Success `, {
          timeOut: 3000,
        });
        // Reset the form after the success message is shown
        this.updateRateForm.reset();
      })
      .catch(error => console.log(error));

  }


  onSubmit() {
    // Check if the form is invalid
    if (this.addRateForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Check if any required field is empty
    if (this.rateData['country'].value.trim() === '' || this.rateData['symbol'].value.trim() === '' || this.rateData['rate'].value === null) {
      // Show error message if any required field is empty
      this.toastr.error('Please fill all fields', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Check if email already exists
    const countryExists = this.rateList.some((user: any) => user.country === this.rateData['country'].value);
    if (countryExists) {
      // Show error message if email already exists
      this.toastr.error('Country already exists', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Construct email address from form data and baseURL
    const country = this.rateData['country'].value;
    const symbol = this.rateData['symbol'].value.toUpperCase();
    const rate = this.rateData['rate'].value;
 



console.log(this.estDateTime);
    console.log(country + symbol + this.estDateTime);
    // Create a new email object with email, password, role, and isActive properties
    const newRate: RateLogs = { country: country, symbol: symbol, history: [] };
    newRate.history.push({ rate: rate, date_time: this.estDateTime})

    this.marketService.addRateData(newRate)
      .then((value: any) => {

        // Show success message if admin is added successfully
        this.toastr.success(`${country} Rate created`, `Success `, {
          timeOut: 3000,
        });
        // Reset the form after the success message is shown
        this.addRateForm.reset();
      })
      .catch((error: any) => console.log(error));
  }



}