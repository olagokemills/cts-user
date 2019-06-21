import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/classes/password-validation';
import { AuthService } from 'src/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  id: any;
  success = false;
  failure = false;
  message: string;

  constructor(public fb: FormBuilder, private api: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', [Validators.required, Validators.minLength(6)] ],
      confirmPassword: ['', Validators.required ]
    },
    {
      validator: PasswordValidation.MatchPassword // your validation method
    });
    this.route.queryParams.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['token']) //log the value of id
      this.id = decodeURIComponent(params['token']);
      console.log(this.id);
    });
  }

  onSubmit() {
    this.failure = false;
    let body = '';

    body = 'password=' + this.resetPasswordForm.value.password + '&username=' + this.resetPasswordForm.value.username;

    this.api.forgotPassword(this.id, body).subscribe(
      res => {
        console.log(res);
        if (res['response'] === 'Updated') {
          this.message = "Password Successfully Changed. Redirecting to Login Page.";
          this.success = true;
          setTimeout(() => {
            this.success = false;
            this.router.navigate(['sign-in']);
          }, 5000);
        } else {
          this.message = res['response'];
          this.failure = true;
        }
      },
      err => {
        console.log(err)
        this.message = err['error'];
          this.failure = true;
      }  
    )
  }

}
