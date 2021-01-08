import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // message = '';
  // user: User = new User();

  form: any = {};
  isSuccessful = false;
  isLoginFailed = false;
  errorMessage = '';

  isLoggedIn = false;

  regexp: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  isInvalid = false;
  
  constructor(private userService: UserService,
    private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn) {
      this.router.navigate(['/users']);
    }
  }

  goToUsersList(){
    this.router.navigate(['/users']);
  }

  validateEmail(){
    //console.log(this.form.email);
    if(this.regexp.test(this.form.email)) {
      this.isInvalid = false;
    }
    else {
      this.isInvalid = true;
    }
    //console.log(this.isInvalid);
  }

  onSubmit(){
    //console.log(this.form.email);
    if(this.regexp.test(this.form.email)) {
      this.userService.login(this.form).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data.email);
          window.location.reload();

          console.log(data);
          this.isSuccessful = true;
          this.isLoginFailed = false;
          this.goToUsersList();
        },
        err => {
          console.log(this.form);
          this.errorMessage = err.error.description;
          this.isLoginFailed = true;
        }
      );
    }
    else {
      this.errorMessage = 'Invalid email format';
      this.isLoginFailed = true;
    }
  }

}
