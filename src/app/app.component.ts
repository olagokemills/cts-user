import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cts';

  constructor(private api: AuthService, private router: Router) {
    this.checkToken();
    this.checkUserUD();
  }

  checkToken() {
    if (sessionStorage.getItem('x-at') !== null) {
      console.log('true');
      return;
    }

    this.api.checkForJWT()
        .subscribe(data => {
          console.log(data);
          sessionStorage.setItem('x-at', data['response'].jwt);
    });
  }

  checkUserUD() {
    if (sessionStorage.getItem('ud') === null) {
      this.router.navigate(['']);
    }
  }
}
