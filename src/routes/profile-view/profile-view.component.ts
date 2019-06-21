import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { GlobalService } from 'src/services/global/global.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  userData: any = {
    username: '',
    firstname: '',
    lastname: '',
    middlename: '',
    gender: '',
    mobile: '',
    address: ''
  }
  uData: any;
  editProfileForm: any;
  message = '';
  success = false;
  failure = false;

  constructor(private api: AuthService, public global: GlobalService, public fb: FormBuilder) { 
   }

  ngOnInit() {
    this.getProfile();
    this.editProfileForm = this.fb.group({
      // username: [this.userData.username, Validators.required ],
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      middlename: ['', Validators.required ],
      // gender: ['', Validators.required ],
      phone: ['', Validators.required ],
      address: ['', Validators.required],
      status: ['approved', Validators.required ],
      // email: ['', Validators.required ],
      access: ['user', Validators. required ],
      image: ['user.84jpg', Validators.required ]
    });
  }

  getProfile() {
    this.api.getCredentials().subscribe(
      res => {
        this.userData = res['response'][0];
      },
      err => console.error()
    )
  }

  onSubmit() {
    console.log(this.editProfileForm);
    let data = '';

    data =  'username=' + this.userData.username +
            '&firstname=' + this.editProfileForm.value.firstname +
            '&lastname=' + this.editProfileForm.value.lastname + 
            '&middlename=' + this.editProfileForm.value.middlename +
            '&sex=' + this.userData.sex +
            '&address=' + this.editProfileForm.value.address +
            '&mobile=' + this.editProfileForm.value.phone +
            '&email=' + this.userData.email + 
            '&status=' + this.userData.status +
            '&image=' + this.userData.image +
            '&access=' + this.userData.access +
            '&authid=' + this.userData.authid

    this.api.editProfile(this.userData.authid, data).subscribe(
      res => {
        // console.log(res);
        if (res['response'] === 'Updated') {
          this.message = 'Account Details Updated Successfully';
          this.success = true;
          this.editProfileForm.reset();
          setTimeout(() => {
            this.success = false;
            this.message = ''
          }, 3000);
        } else {
          this.message = 'Error Updating Account Details';
          this.failure = true;
          setTimeout(() => {
            this.failure = false;
            this.message = '';
          }, 3000);
        } 
        this.getProfile();
      },
      err => console.error()
    )
  }

}
