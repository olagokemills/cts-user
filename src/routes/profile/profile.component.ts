import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/services/global/global.service';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  createProfileForm: FormGroup;
  success = false;
  failure = false;
  message: string;
  
  constructor(public fb: FormBuilder, public global: GlobalService, public api: AuthService, private router: Router) { }

  ngOnInit() {
    this.createProfileForm = this.fb.group({
      username: [{value: this.global.regDetails.username, disabled: true}, Validators.required ],
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      middlename: ['', Validators.required ],
      gender: ['', Validators.required ],
      phone: ['', Validators.required ],
      address: ['', Validators.required],
      status: ['approved', Validators.required ],
      email: [{value: this.global.regDetails.email, disabled: true}, Validators.required ],
      access: ['user', Validators. required ],
      image: ['user.jpg', Validators.required ]
    });
  }

  onSubmit() {
    this.failure = false;
    let body = '';

    body =  'username=' + this.global.regDetails.username +
            '&firstname=' + this.createProfileForm.value.firstname +
            '&lastname=' + this.createProfileForm.value.lastname +
            '&middlename=' + this.createProfileForm.value.middlename +
            '&sex=' + this.createProfileForm.value.gender +
            '&mobile=' + this.createProfileForm.value.phone +
            '&address=' + this.createProfileForm.value.address +
            '&status=' + this.createProfileForm.value.status +
            '&email=' + this.global.regDetails.email +
            '&access=' + this.createProfileForm.value.access +
            '&image=' + this.createProfileForm.value.image;
            '&authid=' + JSON.parse(sessionStorage.getItem('ud')).authid;

    this.api.createAccount(body).subscribe(
      res => {
        console.log(res)
        if (res['response'] === 'inserted') {
          this.message = 'Profile Created Successfully';
          this.success = true;
          setTimeout(() => {
              this.router.navigate(['/dashboard']);
              this.success = false;
          }, 3000);
        }
      },
      err => {
        console.error();
        this.message = err['error'];
        this.failure = true;
      })
  }

}
