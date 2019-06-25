import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  regDetails = {
    username: '',
    email: ''
  };
  courseDetails: any;
  paymentPortal: any;
  eventDetails : any;
  postDetails :any;
  categoryPosts: any;

  constructor(private router: Router) { }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['sign-in']);
  }
}
