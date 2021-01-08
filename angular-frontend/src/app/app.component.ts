import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 10 + Spring Boot';

  isLoggedIn = false;
  email: string;

  constructor(private titleService: Title, private tokenStorageService: TokenStorageService) {}

  setDocTitle(title: string) {
    console.log('current title: ' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.email = user;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
}
