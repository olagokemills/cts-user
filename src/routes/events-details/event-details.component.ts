import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { AuthService } from 'src/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  applyForm: FormGroup; 
 success = false;
  failure = false;
  user: any;
  userD: any;
  message:string;


  constructor(public fb: FormBuilder, private global: GlobalService, private api: AuthService, private router: Router) { 
  this.user = JSON.parse(sessionStorage.getItem('udd'));
  console.log(this.user);
}
  ngOnInit() {

  }

  register() {
    this.failure = false;
    this.message = '';
    let data = '';

    let note = 'Yeah, i am going';
    let phone = '+2347067980742';

    data = 'firstname=' + this.user.firstname + '&lastname=' + this.user.lastname + '&email=' + this.user.email + '&title=' + this.global.eventDetails.title +'&eventid=' + this.global.eventDetails.eventid + '&phone=' + phone + '&notes=' + note;

    this.api.postRequest1('events/apply', data)
        .then(res => {
          console.log(res);
          if (res.response === "inserted") {
            this.message = 'Event Registered Successfully.';
            this.success = true;
            $(".reg-btn").addClass('disabled');
           // this.apply();
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

  notify(){
    
  }

  goToPayment(data) {
    this.global.paymentPortal = data;
    $('#modalMembers').modal('toggle');
    this.router.navigate(['/payment']);
  }

}
