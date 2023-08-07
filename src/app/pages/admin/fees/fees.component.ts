import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import SettingsModel from '../../../models/settings.model';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  settingForm!: FormGroup;
  submitted = false;
  settingsModel!: SettingsModel;
  id: any;

  loginLogs: any;

  constructor(private settingsModelService: SettingsService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  async ngOnInit() {
    // Initialize the component on load
    // Retrieve the settingsModel data from the service
    const snapshot = await this.settingsModelService.getData();
    // Iterate through the data to get the values for each form control
    snapshot.forEach((doc: any) => {
      this.settingsModel = doc.data();

      // Assign the form controls with the values retrieved from the database
      this.settingForm = this.formBuilder.group({
        maxDeposit: [this.settingsModel.maxDeposit, [Validators.required]],
        minDeposit: [this.settingsModel.minDeposit, [Validators.required]],
        maxWithdraw: [this.settingsModel.maxWithdraw, [Validators.required]],
        minWithdraw: [this.settingsModel.minWithdraw, [Validators.required]],
      });
    });
  }

  // Getter for easy access to the form controls
  get f() {
    return this.settingForm.controls;
  }

  onSubmit() {
    // Get the user id from local storage
    const userId = localStorage.getItem('user');
    // Get the form data
    const formData = this.getFormData();
  
    // Validate the form before submission
    if (this.isFormValid()) {
      // Call the updateSettings function to update the settings in the database
      this.updateSettings(userId, formData);
    }
  }
  
  // Function to get the form data
  getFormData() {
    return {
      maxDeposit: this.f['maxDeposit'].value,
      minDeposit: this.f['minDeposit'].value,
      maxWithdraw: this.f['maxWithdraw'].value,
      minWithdraw: this.f['minWithdraw'].value,
    };
  }
  
  // Function to check if the form is valid
  isFormValid() {
    if (this.settingForm.invalid) {
      return false;
    }
    return true;
  }
  
  // Function to update the settings in the database
  async updateSettings(userId:any, formData:any) {
    try {
      await this.settingsModelService.update(userId.id, formData);
      // Show a success toast notification
      this.showSuccessToast();
    } catch (error) {
      // Show an error toast notification
      this.showErrorToast(error);
    }
  }
  
  // Function to show a success toast notification
  showSuccessToast() {
    this.toastr.success('Fees updated successfully', 'Success', {
      timeOut: 3000,
    });
  }
  
  // Function to show an error toast notification
  showErrorToast(error:any) {
    this.toastr.warning(error.toString(), 'Error', {
      timeOut: 3000,
    });
  }
}
