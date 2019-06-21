import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/services/global/global.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  success = false;
  failure = false;
  message: string;
   
  constructor(private api: AuthService, public fb: FormBuilder, private router: Router, public global: GlobalService) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.failure = false;
    this.message = '';
    let data = ''

    data = 'username=' + this.signInForm.value.username + '&password=' + this.signInForm.value.password

    this.api.postRequest('accounts/login', data)
        .then(res => {
          console.log(res);
          if (res.message === "OK") {
            this.message = 'Account Signed In Successfully';
            this.success = true;
            // sessionStorage.removeItem('x-at');
            sessionStorage.setItem('x-lt', res.response.jwt);
            sessionStorage.setItem('ud', JSON.stringify(res.response.data));
            this.global.regDetails['username'] = res.response.data.username;
            this.global.regDetails['email'] = res.response.data.email;
            this.api.getCredentials().subscribe(
              resp => {
                setTimeout(() => {
                  if (resp['response'] === 'No content') {
                    this.router.navigate(['/create-profile']);
                    this.success = false;
                  } else {
                    this.router.navigate(['/dashboard']);
                    this.success = false;
                  } 
                }, 3000);
              },
              err => console.error()
            )
          } else {
            this.message = res.error;
            this.failure = true;
          }
           
        })
        .catch(err => {
          console.log(err);
          this.message = err.error;
          this.failure = true;
        });
  }

}
