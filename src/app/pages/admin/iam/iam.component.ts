import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { IamService } from './iam.service';
import { LoginAllow } from 'src/app/models/loginAllow.models';
import { map } from 'rxjs';
import AdminModel from 'src/app/models/super.admin.mode';

@Component({
  selector: 'app-iam',
  templateUrl: './iam.component.html',
  styleUrls: ['./iam.component.css']
})
export class IamComponent implements OnInit {
  baseURL = 'gmail.com'
  adminForm!: FormGroup;
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
  admin!: AdminModel
  pickedUser: any
  public showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private iamService: IamService) { }
  ngOnInit() {
    this.iamService.createCollection();

    this.adminForm = this.formBuilder.group({
      username: [''],
      password: [''],
      role: ['']
    });
    //this.deleteAllData()

    this._fetchData()
    this.loginAllowList
    this.getRoles();
    this.filteredRoles
    this.rolesData


  }
  // This function deletes all the data from the collection
  deleteAllData() {
    this.iamService.emptyCollection().then(() => {
      console.log('Collection emptied successfully.');
    }).catch(error => {
      console.error('Error emptying collection:', error);
    });
  }

  update() {
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
    this.firstName = this.adminRoleData['firstName'].value;
    this.lastName = this.adminRoleData['lastName'].value;
    console.log(this.userEmail + this.password);

    // Get the selected role from the form
    const selectedRole = this.adminRoleData['role'].value;

    // Create a new email object with email, password, role, and isActive properties
    const updateUser = { email: this.pickedUser.email, password: this.password, role: selectedRole, isActive: true, firstName: this.firstName, lastName: this.lastName };

    // Call the addLoginAllowData method from the iamService with the newEmail object
    this.iamService.update(this.pickedUser.id, updateUser)
      .then((value) => {

        // Show success message if admin is added successfully
        this.toastr.success('Admin added', `Success `, {
          timeOut: 3000,
        });
        // Reset the form after the success message is shown
        this.adminForm.reset();
      })
      .catch(error => console.log(error));

  }



  // This function deletes a user with the specified id
  deleteUser() {

    this.iamService.deleteUser(this.userId).then(() => {
      this.toastr.success('User has deleted', 'Success', {
        timeOut: 3000,
      });
    }).catch(error => {
      console.error(error);
    });
  }

  // This function fetches all the data from the collection and subscribes to the changes
  _fetchData() {
    this.iamService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: any) => {

      // Stores the fetched data into loginAllowList
      this.loginAllowList = data
      console.log(data);
      this.loginData = data;
      this.rolesData = data
      // Calls the getRoles function to filter the roles
      this.getRoles()

      const currentUser = JSON.parse(localStorage.getItem('user')!);
      this.admin = currentUser
      
    });
  }

  // This function filters the roles in the loginAllowList and stores them in filteredRoles
  getRoles(): void {

    // Checks if loginAllowList is not null or undefined
    if (!this.loginAllowList) {
      console.error('loginAllowList is undefined or null.');
      return;
    }

    // Filters the roles in the loginAllowList and stores them in filteredRoles
    this.filteredRoles = this.loginAllowList.filter((data: any) => data.email !== 'pharmplug@gmail.com' );
    console.log(this.filteredRoles);
  }


  close() {
    this.showUserEdit = true;
  }
  getUserInfo(index: any) {
    if (this.filteredRoles.length > 0) {
      this.showUserEdit = false;
      this.userEmail = this.filteredRoles[index].email;
      this.userId = this.filteredRoles[index].id;
      this.pickedUser = this.filteredRoles[index]
      console.log(this.filteredRoles[index])
      this.updateAdminRoleForm = this.formBuilder.group({
        username: this.pickedUser.email,
        password: this.pickedUser.password,
        role: this.pickedUser.role,
        firstName: this.pickedUser.firstName,
        lastName: this.pickedUser.lastName,
        id: this.pickedUser.id,
      });
    }
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
    if (this.adminData['username'].value.trim() === '' || this.adminData['password'].value.trim() === '' || this.adminData['role'].value.trim() === '') {
      // Show error message if any required field is empty
      this.toastr.error('Please fill all fields', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Check if username is valid
    if (/^\d+$/.test(this.adminData['username'].value.trim())) {
      // Show error message if username is all numbers
      this.toastr.error('Username cannot be all numbers', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Check if email already exists
    const emailExists = this.loginData.some((user: any) => user.email === `${this.adminData['username'].value}${this.baseURL}`);
    if (emailExists) {
      // Show error message if email already exists
      this.toastr.error('Email already exists', 'Error', {
        timeOut: 3000,
      });
      return; // exit function early
    }

    // Construct email address from form data and baseURL
    this.userEmail = this.adminData['username'].value + this.baseURL;
    this.password = this.adminData['password'].value;
    console.log(this.userEmail + this.password);

    // Get the selected role from the form
    const selectedRole = this.adminData['role'].value;

    // Create a new email object with email, password, role, and isActive properties
    const newEmail = { email: this.userEmail, password: this.password, role: selectedRole, isActive: true };

    // Call the addLoginAllowData method from the iamService with the newEmail object
    this.iamService.addLoginAllowData(newEmail)
      .then((value) => {

        // Show success message if admin is added successfully
        this.toastr.success('Admin added', `Success `, {
          timeOut: 3000,
        });
        // Reset the form after the success message is shown
        this.adminForm.reset();
      })
      .catch(error => console.log(error));
  }



}
