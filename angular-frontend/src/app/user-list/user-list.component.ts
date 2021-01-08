import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  filters = {
    keyword: ''
  }
  isLoggedIn = false;

  constructor(private userService: UserService,
    private router: Router, private tokenStorageService: TokenStorageService) { }

    ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if(this.isLoggedIn) {
        this.getUsers();
      }
      else
        this.router.navigate(['/login']);

      
    }

    getUsers(){
      this.userService.getUsers().subscribe(data => {
        //console.log(data);
        this.users = this.filterUsers(data);
      });
    }
  
    private filterUsers(users: User[]) {
      //console.log(users);
      return users.filter((e) => {
        return e.email.toLowerCase().includes(this.filters.keyword.toLowerCase());
      })
    }

}
