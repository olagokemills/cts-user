import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { PasswordValidation } from "../../classes/password-validation";
import { Router } from '@angular/router';
import { GlobalService } from 'src/services/global/global.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  passwordForm: FormGroup;
  message: any;
  success = false;
  failure = false;

  constructor(private api: AuthService, public fb: FormBuilder, private router: Router, public global: GlobalService) { 
   }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)] ],
      confirmPassword: ['', Validators.required ]
    }, 
    {
      validator: PasswordValidation.MatchPassword // your validation method
    });
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)] ],
      password: this.passwordForm,
      email: ['', [Validators.required, Validators.email]],
      access: ['user']
    });
  
  }

  onSubmit() {
    this.failure = false;
    let data = new FormData();
    let body = '';
    let datum ='';

    body = 'username=' + this.signUpForm.value.username + '&email=' + this.signUpForm.value.email + '&password=' + this.signUpForm.value.password.password + '&access=' + this.signUpForm.value.access
    datum = 'username=' + this.signUpForm.value.username + '&password=' + this.signUpForm.value.password;
    // body = JSON.stringify(body);
    console.log(body);

    this.api.postRequest('accounts/register', body)
        .then(res => {
          console.log(res);
          if (res.response === 'inserted') {
            this.global.regDetails['username'] = this.signUpForm.value.username;
            this.global.regDetails['email'] = this.signUpForm.value.email;
          this.api.postRequest('accounts/login', body)
              .then(res => {
                if (res.message === "OK") {
                  this.message = 'Account Registered Successfully';
                  this.notify();
                  this.success = true;
                  sessionStorage.removeItem('x-at');
                  sessionStorage.setItem('x-lt', res.response.jwt);
                  sessionStorage.setItem('ud', JSON.stringify(res.response.data));
                  setTimeout(() => {
                    this.router.navigate(['/create-profile']);
                  }, 3000); 
                } else {
                  this.message = res.error;
                  this.failure = true;
                }
              })
              .catch(
              )
          } else {  
              this.message = res.response;
              this.failure = true; 
          }
        })
        .catch(err => console.log(err)
    );
  }

  login() {
    this.failure = false;
    this.message = '';
    let data = ''

    data = 'username=' + this.signUpForm.value.username + '&password=' + this.signUpForm.value.password

    this.api.postRequest('accounts/login', data)
        .then(res => {
          console.log(res);
          if (res.message === "OK") {
            sessionStorage.removeItem('x-at');
            sessionStorage.setItem('x-lt', res.response.jwt);
            sessionStorage.setItem('ud', JSON.stringify(res.response.data)); 
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

  notify() {
    let notify;

    notify = 'email=accounts@cts.com' +
    '&recipient=' + this.signUpForm.value.email +
    '&sender=CTS Accounts Admin' + 
    '&subject=Reset Password' + 
    '&message=You have successfully signed up.'
    this.api.notifyEmail(notify).subscribe(
      resp => {
      console.log(resp);
        },
        err => {
          console.error();
          }
        )
  }

}
