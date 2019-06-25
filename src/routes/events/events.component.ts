import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { GlobalService } from 'src/services/global/global.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any;
  constructor(private api: AuthService, public global: GlobalService,  private router: Router) { }


  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.api.getEvents().subscribe(
      res => {
        console.log(res);
        this.events = res['response'];
      },
      err => console.error()
    )
  }

  goToEventDetails(data) {
    this.global.eventDetails = data;
    this.router.navigate(['event-details']);
  }

}