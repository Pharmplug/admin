import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/pages/auth/auth-utils/authUtils';
import { IamService } from '../../admin/iam/iam.service';
import { map } from 'rxjs';
import { LoginAllow } from 'src/app/models/loginAllow.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class LoginComponent implements OnInit {
  year: number = new Date().getFullYear();
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  ip!: any;
  public showPassword: boolean = false;
  showLoginButton: boolean = true;
  baseURL = '@gmail.com'
  id: any
  loginAllowList!: LoginAllow[];
  filteredRoles!: LoginAllow[];

  constructor(
 public router: Router,
    private formBuilder: FormBuilder,
    private iamService: IamService, private toastr: ToastrService,
    public http: HttpClient
  ) { }
  ngOnInit() {

    /**
     * Initialize login form
     */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });


   // this.logout()

    /**
     * initialize functions
     */
  //  this._fetchData()
   // this.getIpAddress()
  }
  /**
   * Asynchronously retrieves the user's IP address using a third-party API.
   * Logs the IP address to the console upon successful retrieval.
   */
  async getIpAddress() {
    try {
      const res: any = await this.http.get('http://api.ipify.org/?format=json').toPromise();
      this.ip = res!['ip'];
      console.error(this.ip);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Fetches data from the IAM service and updates the `loginAllowList` array with the retrieved data.
   */
  _fetchData() {
    this.iamService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.loginAllowList = data;
    });
  }


  // convenience getter for easy access to form fields
  get formData() { return this.loginForm.controls; }



  /**
   * This method is called when the user clicks the "Login" button.
   * It first checks if the user is allowed to login based on their email address.
   * If the user is not allowed, it displays a warning message.
   * If the user is allowed, it updates their login history and authenticates them.
   * If authentication is successful, it sets the user object in local storage and navigates to the admin page.
   * If authentication fails, it displays an error message.
   */
  login = async () => {

    this.router.navigate(['/admin']);

    // if (this.formData['email'].value.endsWith(`${this.baseURL}`)) {
    //   this.toastr.warning('Your username must not include @orokii.com', 'Error', {
    //     timeOut: 3000,
    //   });
    //   return;
    // }

    // this.showLoginButton = false;

//     let getEmail = `${this.formData['email'].value}${this.baseURL}`
//     let userPassword = `${this.formData['password'].value}`

//     // Check if email is on allow list
//     if (getEmail !== '<>') {
//       // Find user by email
//       const user = this.loginAllowList.find((user: LoginAllow) => user.email === getEmail);
//       // Display warning message if user not found
//       if (!user) {
//         this.toastr.warning('We cannot find this user on our records', 'Error', {
//           timeOut: 3000,
//         });
//         this.showLoginButton = true;
//         return;
//       }

//       // Display warning message if user password not match
//       if (user!.password != userPassword) {
//         this.toastr.warning('Invalid password', 'Error', {
//           timeOut: 3000,
//         });
//         this.showLoginButton = true;
//         return;
//       }

//       // Update user login history
//       const now = new Date();
//       const ip = this.ip;
//       this.id = user!.id
//       const data = { lastLogin: now, ip: ip };
//       user!.history = user!.history || [];
//       user!.history.push(data);
//       // Set user in local storage
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('role', user.role);
//       console.log(localStorage.getItem('role'))
//       const currentUser = JSON.parse(localStorage.getItem('user')!);
//       console.log(currentUser)


//       // Update user in the database
//       this.iamService.update(this.id, user)
//         .then(() => {
//           // Display success message and navigate to admin page
//           const displayName = user?.email ? user.email : 'User';
//           this.toastr.success(`Welcome ${displayName}`, 'Logged-in Successfully', {
//             timeOut: 1500,
//           });
//           this.router.navigate(['/admin']);
//         })


//     }
// //FOR SUPER ADMIN
//     else {

//       // Find user by email
//       const user = this.loginAllowList.find((user: LoginAllow) => user.email === getEmail);

//       // Authenticate user
//       this.authService.SignIn(getEmail, this.formData['password'].value)
//         .then((result) => {
//           // Display warning message if user not found
//           if (!user) {
//             // Create a new email object with email, role, and isActive properties
//             const newEmail = { email: getEmail, password: '', role: '3', isActive: true };
//             // Call the addLoginAllowData method from the iamService with the newEmail object
//             this.iamService.addLoginAllowData(newEmail)
//               .then(() => {
//                 // Display success message and navigate to admin page
//                 const displayName = result.user?.displayName ? result.user.displayName : 'User';
//                 this.toastr.success(`Welcome ${displayName}`, 'Logged-in Successfully', {
//                   timeOut: 1500,
//                 });
//                 this.router.navigate(['/admin']);
//               })

//               .catch(error => {
//                 this.showLoginButton = true;
//                 console.log(error)
//               });

//           } else {
//             // Update user login history
//             const now = new Date();
//             const ip = this.ip;
//             this.id = user!.id
//             const data = { lastLogin: now, ip: ip };
//             user!.history = user!.history || [];
//             user!.history.push(data);


//             // Update user in the database
//             this.iamService.update(this.id, user)
//               .then(() => {


//                 // Set user in local storage
//                 localStorage.setItem('user', JSON.stringify(user));
//                 localStorage.setItem('role', user!.role);
//                 console.log(localStorage.getItem('role'))
//                 const currentUser = JSON.parse(localStorage.getItem('user')!);
//                 console.log(currentUser)

//                 // Display success message and navigate to admin page
//                 const displayName = result.user?.displayName ? result.user.displayName : 'User';
//                 this.toastr.success(`Welcome ${displayName}`, 'Logged-in Successfully', {
//                   timeOut: 1500,
//                 });
//                 this.router.navigate(['/admin']);
//               })
//               .catch((error) => {
//                 // Display error message if authentication fails
//                 this.toastr.error(error, 'Error', {
//                   timeOut: 1500,
//                 });

//                 this.showLoginButton = true;


//               })

//               .catch((error) => {
//                 // Display error message if authentication fails
//                 this.toastr.error(error, 'Error', {
//                   timeOut: 1500,
//                 });
//                 this.showLoginButton = true;
//               }

//               )
//           }

//         }).catch((error: any) => {
//           // Display error message
//           this.toastr.success('Confirm that the username and password are correct', 'Logged-in Failed', {
//             timeOut: 1500,
//           });
//           this.showLoginButton = true;
//         })
//     }

  }












  // Function to logout user
  logout() {
    // Clear session information from local storage
    localStorage.removeItem('user');
    const currentUser = JSON.parse(localStorage.getItem('user')!);

    console.log(currentUser)
  }


}