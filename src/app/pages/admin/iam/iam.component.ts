import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { IamService } from './iam.service';

import { last, map } from 'rxjs';
import AdminModel from 'src/app/models/super.admin.mode';
import { LoginAllow } from 'src/app/models/admin.model';
import { NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-iam',
  templateUrl: './iam.component.html',
  styleUrls: ['./iam.component.css']
})
export class IamComponent implements OnInit {
  baseURL = 'gmail.com'
  adminForm!: FormGroup;
  showLoginButton: boolean = true;
  rolesData!: LoginAllow;
  updateAdminRoleForm!: FormGroup;
  loginData!: any;
  loginAllowList!: LoginAllow[];
  filteredRoles!: LoginAllow[];
  password!: string;
  firstName!: string;
  lastName!: string;
  showUserEdit = true;
  userEmail!: string;
  userId!: any;
  admin!: LoginAllow
  pickedUser: any
  showUpdateButton:boolean=true
  public showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private iamService: IamService) { }
  ngOnInit() {


    this.adminForm = this.formBuilder.group({
      email: [''],
      password: [''],
      role: [''],
      firstName: [''],
      lastName: [''],
      status: [''],
    });
    //this.deleteAllData()

    this._fetchData()
    this.loginAllowList
    this.getRoles();
    this.filteredRoles
    this.rolesData

    const currentUser = JSON.parse(localStorage.getItem('user')!);
    this.admin = currentUser;
  }
  // This function deletes all the data from the collection
  deleteAllData() {

  }

  update() {
    console.log(this.pickedUser)
    // Check if the form is invalid
    if (this.updateAdminRoleForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }
    // Construct email address from form data and baseURL

    var newPassword = this.adminRoleData['password'].value;
    if (newPassword === null) {
      this.password = this.pickedUser.password;
    } else {
      this.password = newPassword
    }
    var nfirstName = this.adminRoleData['firstName'].value;
    var nlastName = this.adminRoleData['lastName'].value;

    if (nfirstName === null || nlastName === null) {
      this.firstName = this.pickedUser.name;
      this.lastName = this.pickedUser.surname
    } else {
      this.firstName = nfirstName;
      this.lastName = nlastName
    }
    console.log(this.userEmail + this.password);

    // Get the selected role from the form
    let selectedRole = this.adminRoleData['role'].value;

    switch (this.adminRoleData['role'].value) {
      case '0':
        selectedRole = "Admin"
        // Add your code for handling Type A here
        break;
      case '1':
        selectedRole = "Marketing"
        // Add your code for handling Type B here
        break;
      case '2':
        selectedRole = "Operations"
        // Add your code for handling Type C here
        break;
      case '3':
        selectedRole = "Super Admin"
        // Add your code for handling Type C here
        break;
      default:
        selectedRole = this.pickedUser.role
      // Add your code for handling unknown types here
    }
    let isActive = this.adminRoleData['status'].value;

    switch (this.adminRoleData['status'].value) {
      case '0':
        isActive = true
        // Add your code for handling Type A here
        break;
      case '1':
        isActive = false
        // Add your code for handling Type B here
        break;

      default:
        isActive = this.pickedUser.status
      // Add your code for handling unknown types here
    }


    this.showUpdateButton=false

    // Create a new email object with email, password, role, and isActive properties
    const updateUser = { id: this.pickedUser.id, email: this.pickedUser.email, password: this.password, role: selectedRole, status: isActive, name: this.firstName, surname: this.lastName };
    // Call the addLoginAllowData method from the iamService with the newEmail object
    console.log(updateUser)
    this.iamService.update(updateUser)
      .then((value) => {

        if (!value.status) {
          // Show success message if admin is added successfully
          this.toastr.error(value.data, "Error", {
            timeOut: 3000,
          });
          this.showUpdateButton=true
        } else {
          // Show success message if admin is added successfully
          this.toastr.success(`${value.data.name} ${value.data.surname} now assigned to ${value.data.role}`, `Success`, {
            timeOut: 3000,
          });
          this._fetchData()
          // Reset the form after the success message is shown
          this.adminForm.reset();
          this.showUpdateButton=true
        }

      })
      .catch(error => {
        console.log(error)
      })
  }



  // This function deletes a user with the specified id
  deleteUser() {
    console.log(this.pickedUser.id)
    const data = { "id": this.pickedUser.id }
    this.iamService.deleteAdmin(data).then((result) => {


      if (!result.status) {
        this.toastr.error(result.data, 'Error', {
          timeOut: 3000,
        });
        this._fetchData()
      } else {
        this.toastr.success(`${result.data.name} has been deleted`, 'Success', {
          timeOut: 3000,
        });
        this._fetchData()
      }
    
    }).catch(error => {
      console.error(error);
    });
  }

  // This function fetches all the data from the collection and subscribes to the changes
  _fetchData() {

    this.iamService.getAllAdmin()
      .then((result) => {
        // Stores the fetched data into loginAllowList
        this.loginAllowList = result.data
        console.log(this.loginAllowList);
        // Calls the getRoles function to filter the roles
        this.getRoles()
      })


  }

  // This function filters the roles in the loginAllowList and stores them in filteredRoles
  getRoles() {

    // Checks if loginAllowList is not null or undefined
    if (!this.loginAllowList) {
      console.error('loginAllowList is undefined or null.');
      return;
    }
    console.log(this.loginAllowList)
    // Filters the roles in the loginAllowList and stores them in filteredRoles
    this.filteredRoles = this.loginAllowList.filter((data: any) => data.email !== 'pharmplug@gmail.com');
    console.log(this.filteredRoles);
  }


  close() {
    this.showUserEdit = true;
  }


  getUserInfo(index: any) {
   
      this.showUserEdit = false;
      this.userEmail = index.email;
      this.userId = index.id;
      this.pickedUser = index
      
      this.updateAdminRoleForm = this.formBuilder.group({
        username: this.pickedUser.email,
        password: this.pickedUser.password,
        role: this.pickedUser.role,
        firstName: this.pickedUser.name,
        lastName: this.pickedUser.surname,
        id: this.pickedUser.id,
        status: this.pickedUser.status
      });
    
  }

  get adminData() { return this.adminForm.controls; }
  get adminRoleData() { return this.updateAdminRoleForm.controls; }

  onSubmit() {
    // Check if the form is invalid
    if (this.adminForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Check if any required field is empty
    if (this.adminData['email'].value.trim() === '' || this.adminData['firstName'].value.trim() === '' || this.adminData['lastName'].value.trim() === '' || this.adminData['password'].value.trim() === '' || this.adminData['role'].value.trim() === '' || this.adminData['status'].value.trim() === null) {
      // Show error message if any required field is empty
      this.toastr.error('Please fill all fields', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Check if input is a valid email
    if (!/^\S+@\S+\.\S+$/.test(this.adminData['email'].value.trim())) {
      // Show error message if input is not a valid email
      this.toastr.error('Invalid email address', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }
    // Check password length
    if (this.adminData['password'].value.trim().length < 8) {
      this.toastr.error('Password must be at least 8 characters long', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Check if password contains at least one uppercase letter, one digit, and one special symbol
    if (!/[A-Z]/.test(this.adminData['password'].value.trim()) || !/\d/.test(this.adminData['password'].value.trim()) || !/[!@#$%^&*]/.test(this.adminData['password'].value.trim())) {
      this.toastr.error('Password must contain at least one uppercase letter, one digit, and one special symbol', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    const mEmail = this.adminData['email'].value.trim();

    // Check if email already exists
    const emailExists = this.loginAllowList.some((user: any) => user.email === mEmail);

    if (emailExists) {
      this.toastr.error('Email already exists', 'Error', {
        timeOut: 3000,
      });
      return; // Exit function early
    }

    if (emailExists) {
      // Show error message if email already exists
      this.toastr.error('Email already exists', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Construct email address from form data and baseURL
    this.userEmail = this.adminData['email'].value
    this.password = this.adminData['password'].value;
    console.log(this.userEmail + this.password);
    var nfirstName = this.adminData['firstName'].value;
    var nlastName = this.adminData['lastName'].value;

    if (nfirstName === null || nlastName === null) {
      this.firstName = this.pickedUser.firstName;
      this.lastName = this.pickedUser.lastName
    } else {
      this.firstName = nfirstName;
      this.lastName = nlastName
    }
    // Get the selected role from the form
    let selectedRole = this.adminData['role'].value;

    switch (this.adminData['role'].value) {
      case '0':
        selectedRole = "Admin"
        // Add your code for handling Type A here
        break;
      case '1':
        selectedRole = "Marketing"
        // Add your code for handling Type B here
        break;
      
      case '2':
        selectedRole = "Super Admin"
        // Add your code for handling Type C here
        break;
      default:
        selectedRole = this.pickedUser.role
      // Add your code for handling unknown types here
    }
    let isActive = this.adminData['status'].value;

    switch (this.adminData['status'].value) {
      case '0':
        isActive = true
        // Add your code for handling Type A here
        break;
      case '1':
        isActive = false
        // Add your code for handling Type B here
        break;

      default:
        isActive = this.pickedUser.status
      // Add your code for handling unknown types here
    }

    // Create a new email object with email, password, role, and isActive properties
    const newAdmin = { email: this.userEmail, password: this.password, confirmPassword: this.password, name: this.firstName, surname: this.lastName, role: selectedRole, status: isActive };
    console.log(newAdmin)
    this.showLoginButton = false;
    // Call the addLoginAllowData method from the iamService with the newEmail object
    this.iamService.addAdmin(newAdmin)
      .then((value) => {

        // Show success message if admin is added successfully
        this.toastr.success(`${value.data.fullname} has been added as ${value.data.role}`, `Success `, {
          timeOut: 3000,
        });
        // Reset the form after the success message is shown
        this.adminForm.reset();
        this._fetchData()
        this.showLoginButton = true;
      })
      .catch(error => console.log(error));
  }



}
