import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
//import { User } from '../user';
import { UserService } from '../user.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // registerForm: FormGroup;
  // submitted = false;
  // message = '';
  // user: User = new User();

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  regexp: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  isInvalid = false;

  isLoggedIn = false;

  constructor(private userService: UserService,
    private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn) {
      this.router.navigate(['/users']);
    }
  }

  validateEmail(){
    console.log(this.form.email);
    if(this.regexp.test(this.form.email)) {
      this.isInvalid = false;
    }
    else {
      this.isInvalid = true;
    }
    console.log(this.isInvalid);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  // onSubmit(){
  //   this.userService.register(this.user).subscribe(
  //     data => {
  //       //console.log(this.user);
  //       //this.message = data.description;
  //       this.goToLogin();
  //     }, 
  //     err => {
  //       console.log(err);
  //       //this.message = err.error.description;
  //     }
  //   )
  // }

  onSubmit(){
    if(this.form.password !== this.form.cPassword) {
      this.errorMessage = 'password does not match';
      this.isSignUpFailed = true;
    }
    else {
      this.userService.register(this.form).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.goToLogin();
        },
        err => {
          console.log(this.form);
          this.errorMessage = err.error.description;
          this.isSignUpFailed = true;
        }
      );
    }

  }

}
