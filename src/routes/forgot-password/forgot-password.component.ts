import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/services/request/request.service';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  checkEmailForm: FormGroup;
  success = false;
  failure = false;
  message: string;

  constructor(private api: AuthService, public fb: FormBuilder) { }

  ngOnInit() {
    this.checkEmailForm = this.fb.group({
      username: ['', Validators.required]
    })
  }

  verifyEmail() {
    this.failure = false;
    this.success = false;
    // let notify = new FormData();
    let notify = '';
    this.api.checkUser(this.checkEmailForm.value.username).subscribe(
      res => {
        console.log(res);
        // this.message = "Recovery Email successfully Sent"
        // notify.append('email', 'accounts@cts.com');
        // notify.append('recipient', res['response'].email);
        // notify.append('sender', 'CTS Accounts Admin');
        // notify.append('subject', 'Reset Password');
        // notify.append('message', 'Click this link to reset your Password: ' + '<a href="https://projects.thealmondmedia.com/ola/cts/frontend/forgot-password/authid/' + res['response'].authid + '">Reset Password</a>');

        notify = 'email=accounts@cts.com' +
                 '&recipient=' + res['response'].email +
                 '&sender=CTS Accounts Admin' + 
                 '&subject=Reset Password' + 
                 '&message=Click this link to reset your Password: ' + '<a href="https://projects.thealmondmedia.com/ola/cts/ctsapp/reset-password?token=' + res['response'].authid + '">Reset Password</a>';

          this.api.notifyEmail(notify).subscribe(
            resp => {
              console.log(resp);
              if (resp['response'] === 'Message has been sent') {
                this.success = true;
                this.message = 'Recovery Email Sent Successfully. Kindly Check Your Inbox/Spam Folders.' 
              }
            },
            err => {
              console.error();
              
            }
          )
      },
      err => {
        console.log(err);
        this.failure = true;
        this.message = err['error'];
      }
    )
  }

}
