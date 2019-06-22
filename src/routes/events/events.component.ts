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

  constructor(private api: AuthService, public global: GlobalService,  private router: Router) { }
  events: any;

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

  goToEventDetail(data) {
    this.global.eventDetail = data;
    this.router.navigate(['event-details']);
  }

}
