import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { GlobalService } from 'src/services/global/global.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  createTicketForm: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  form5: FormGroup;
  tickets: any;
  message = '';
  success = false;
  failure = false;

  constructor(public fb: FormBuilder, private api: AuthService, public global: GlobalService) { }

  ngOnInit() {
    this.getTickets();
    this.createTicketForm = this.fb.group({
      ticketTitle: ['', Validators.required],
      ticketDescription: ['', Validators.required]
    });
    this.form3 = this.fb.group({
      comment: ''
    })

  }

  onSubmit() {
    let data = '';
    data =  'title=' + this.createTicketForm.value.ticketTitle +
            '&description=' + this.createTicketForm.value.ticketDescription + 
            '&owner=' + JSON.parse(sessionStorage.getItem('ud')).username +
            '&status=' + 'open' +
            '&email=' + JSON.parse(sessionStorage.getItem('ud')).email +
            '&response=' + null;

    this.api.postRequest1('tickets', data)
        .then(res => {
          console.log(res);
          this.message = 'Ticket created successfully';
          this.success = true;
        })
        .catch(err => {
          console.error(err);
          this.failure = true;
        });
  }

  getTickets() {
    let user = JSON.parse(sessionStorage.getItem('ud')).username;
    this.api.getTickets(user).subscribe(
      res => {
        console.log(res);
        this.tickets = res['response'];
      },
      err => console.error()
    )
  }

}
