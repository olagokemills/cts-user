import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  portals: any;

  constructor(private global: GlobalService, private api: AuthService, private router: Router) { }

  ngOnInit() {
    this.getPortals();
  }

  getPortals() {
    this.api.getPortal().subscribe(
      res => {
        console.log(res);
        this.portals = res['response'];
      },
      err => console.error()
    )
  }

  goToPayment(data) {
    this.global.paymentPortal = data;
    $('#modalMembers').modal('toggle');
    this.router.navigate(['/payment']);
  }

}
