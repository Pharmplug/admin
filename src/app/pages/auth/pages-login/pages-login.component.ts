import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/pages/auth/auth-utils/authUtils';
import { LoginAllow } from 'src/app/models/admin.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/storage';


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
    private formBuilder: FormBuilder,private tokenService: TokenService,
    private authService: AuthService, private toastr: ToastrService,
    public http: HttpClient
  ) { }
  ngOnInit() {

    /**
     * Initialize login form
    //  */
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

  /**
   * Fetches data from the IAM service and updates the `loginAllowList` array with the retrieved data.
   */

  async _fetchData() {

    var value = await this.authService.getAllAdmin()
    console.log(value)


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




    let getEmail = `${this.formData['email'].value}`
    let userPassword = `${this.formData['password'].value}`

    if (!getEmail || !userPassword) {
      // Handle the case where getEmail or userPassword is missing
      this.toastr.warning(`Error`, "getEmail and/or userPassword is missing.", {
        timeOut: 1500,
      });
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(getEmail)) {
      // Handle invalid email format
      this.toastr.warning(`Error`, "Invalid email format.", {
        timeOut: 1500,
      });
      return
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(userPassword)) {
      // Handle invalid password format
      this.toastr.warning(`Error`, "Invalid password format. Password must be at least 8 characters long and contain a number and a special symbol.", {
        timeOut: 1500,
      });
      return
    }

    this.showLoginButton = false;

    // Find user by email
    // const user = this.loginAllowList.find((user: LoginAllow) => user.email === getEmail);
    const payload = { email: getEmail, password: userPassword };

    console.log(payload)
    // Authenticate user
    this.authService.login(payload)
      .then((result) => {

        console.log(result)
        if (!result.status) {
          this.showLoginButton = true;
          if (result.data===null) {
            this.toastr.warning(`Error`, '', {
              timeOut: 1500,
            });
          } else {
            this.toastr.warning(`Error`, `${result.data}`, {
              timeOut: 1500,
            });
          }
         
        }

        else {
          this.showLoginButton = true;
          if (!result.data.status) {
            this.toastr.warning( `Account ${result.data.fullname} is deactiveated`,`Error`, {
              timeOut: 1500,
            });
          } else {
            this.showLoginButton = true;
            // // Set user in local storage
            localStorage.setItem('user', JSON.stringify(result.data));
            localStorage.setItem('role', result.data.role);
            console.log(result.data.token)
            this.tokenService.setToken(result.data.token);
            console.log(localStorage.getItem('role'))
            // const currentUser = JSON.parse(localStorage.getItem('user')!);
            // Display success message and navigate to admin page
            const displayName = result.data.fullname ? result.data.fullname : 'User';
            this.toastr.success(`Welcome ${displayName}`, 'Logged-in Successfully', {
              timeOut: 1500,
            });
            this.router.navigate(['/admin']);
          }



        }


      }).catch((error: any) => {
        // Display error message
        console.log(error)
        this.toastr.error('Confirm that the username and password are correct', 'Logged-in Failed', {
          timeOut: 1500,
        });
        this.showLoginButton = true;
      })
  }














  // Function to logout user
  logout() {
    // Clear session information from local storage
    localStorage.removeItem('user');
    const currentUser = JSON.parse(localStorage.getItem('user')!);

    console.log(currentUser)
  }


}