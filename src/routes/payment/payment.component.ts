import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/services/global/global.service';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  success = false;
  failure = false;
  message: string;
  user: any;
  userD: any;

  constructor(public fb: FormBuilder, public global: GlobalService, private api: AuthService) { 
    this.user = JSON.parse(sessionStorage.getItem('ud'));
    this.userD = JSON.parse(sessionStorage.getItem('udd'));
   }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      nameoncard: ['', Validators.required],
      cardnumber: ['', Validators.required],
      expiry: ['', Validators.required],
      cvv2: ['', Validators.required]
    })
  }

  onSubmit() {
    this.failure = false;
    this.message = '';
    let data = ''

    data = 'username=' + this.user.username + '&email=' + this.user.email + '&course=' + this.global.courseDetails.course +'&fee=' + this.global.courseDetails.fee + '&portal=' + this.global.paymentPortal;

    this.api.postRequest1('payments', data)
        .then(res => {
          console.log(res);
          if (res.response === "inserted") {
            this.message = 'Payment Made Successfully.';
            this.success = true;
            this.paymentForm.reset();
            this.apply();
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

  apply() {
    let data = '';

    data = 'username=' + this.user.username + '&firstname=' + this.userD.firstname + '&lastname=' + this.userD.lastname + '&fee=' + this.global.courseDetails.fee + '&course=' + this.global.courseDetails.course + '&courseid=' + this.global.courseDetails.courseid + '&contact=' + this.userD.mobile
    this.api.postRequest1('courses/apply', data)
        .then(res => {
          console.log(res);
          this.notify()
          if (res.response === 'inserted') {
            setTimeout(() => {
              this.message = 'Course registered successfully'
            }, 3000);
          }
        })
        .catch(err => {
          console.log(err);
        })
  }

  notify() {
    let notify;

    notify = 'email=accounts@cts.com' +
    '&recipient=' + this.user.email +
    '&sender=CTS Accounts Admin' + 
    '&subject=Payment Successful.' + 
    '&message=Payment Transaction Made Successfully.'
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
