import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/services/global/global.service';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  demoForm: FormGroup;
  memberForm: FormGroup;
  searchForm: FormGroup;
  commentForm: FormGroup;
  comment1Form: FormGroup;
  navSearchForm: FormGroup;
  search1Form: FormGroup;
  dataForm: FormGroup;
  search2Form: FormGroup;
  data1Form: FormGroup;
  courses: any;
  payments: any;

  constructor(private router: Router, public global: GlobalService, private api: AuthService) { }

  ngOnInit() {
    this.getProfile();
    this.getMyCourses();
    this.getPaymentSummary();
  }

  getProfile() {
    this.api.getCredentials().subscribe(
      res => {
        sessionStorage.setItem('udd', JSON.stringify(res['response'][0]));
      },
      err => console.error()
    )
  }

  getMyCourses() {
    this.api.getCoursesPerPerson().subscribe(
      res => {
        this.courses = res['response'];
      },
      err => console.error()
    )
  }

  getPaymentSummary() {
    let user = JSON.parse(sessionStorage.getItem('ud')).email;
    
    this.api.getPayments(user).subscribe(
      res => {
        // console.log(res);
        this.payments = res['response'];
      },
      err => console.error()
    )
  }

}
