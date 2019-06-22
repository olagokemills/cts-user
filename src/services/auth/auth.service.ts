import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('x-at')
  })
}

const url = 'https://projects.thealmondmedia.com/ola/cts/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    if (sessionStorage.getItem('x-lt') || sessionStorage.getItem('x-at') === null) {
      this.checkForJWT();
    }
   }

  checkForJWT() {
    return this.http.get(url + 'authorise');
  }

  checkUser(data) {
    return this.http.get(url + 'accounts/auth/' + data, httpOptions);
  }

  signUp(data) {
    return this.http.post(url + 'accounts/register', data, httpOptions);
  }

  signIn(data) {
    return this.http.post(url + 'accounts/login', data, httpOptions);
  }

  forgotPassword(id, data) {
    return this.http.put(url + 'accounts/forgot-password/authid/' + id, data, httpOptions);
  }

  notifyEmail(data) {
    return this.http.post(url + 'email/notify', data, httpOptions);
  }

  postRequest = (routes: string, data) => 
  {
    try
    {
      return fetch(url + routes, {
          method: "POST",
          headers: {
            "cache-control": "no-cache",
            "Accept-language": "en",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + sessionStorage.getItem('x-at')
          },
          mode: "cors",
          cache: "no-cache", 
          credentials: "same-origin", 
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: data, // body data type must match "Content-Type" header
      })
      .then(response => response.json()) // parses response to JSON
      .catch(error => error);
    }
    catch(ex)
    {
      return ex;
    }
  }

  postRequest1 = (routes: string, data) => 
  {
    try
    {
      return fetch(url + routes, {
          method: "POST",
          headers: {
            "cache-control": "no-cache",
            "Accept-language": "en",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + sessionStorage.getItem('x-lt')
          },
          mode: "cors",
          cache: "no-cache", 
          credentials: "same-origin", 
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: data, // body data type must match "Content-Type" header
      })
      .then(response => response.json()) // parses response to JSON
      .catch(error => error);
    }
    catch(ex)
    {
      return ex;
    }
  }

  createAccount(data) {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.post(url + 'accounts', data, httpOption);
  }

  getCredentials() {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    let data = JSON.parse(sessionStorage.getItem('ud'));
    console.log(data);
    return this.http.get(url + 'accounts/authid/' + data.authid, httpOption);
  }

  getCourses() {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    let data = JSON.parse(sessionStorage.getItem('ud'));
    console.log(data);
    return this.http.get(url + 'courses', httpOption);
  }

  getPosts() {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    let data = JSON.parse(sessionStorage.getItem('ud'));
   // console.log(data);
    return this.http.get(url + 'posts', httpOption);
  }

  getCategories() {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    let data = JSON.parse(sessionStorage.getItem('ud'));
    console.log(data);
    return this.http.get(url + 'posts/categories', httpOption);
  }
  

  getComments() {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    let data = JSON.parse(sessionStorage.getItem('ud'));
   console.log(data);
    return this.http.get(url + 'posts/comments', httpOption);
  }
  

  getPortal() {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get(url + 'posts/portal', httpOption);
  }

  getCoursesPerPerson(  ) {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get(url + '/courses/apply/username/' + JSON.parse(sessionStorage.getItem('ud')).username, httpOption)
  }

  getEvents() {
    let token = sessionStorage.getItem('x-at');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    
    return this.http.get(url + 'events', httpOption);
  }

  editProfile(id, body) {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    
    return this.http.put(url + 'accounts/authid/' + id, body, httpOption);
  }

  getTickets(owner) {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    
    return this.http.get(url + 'tickets/owner/' + owner, httpOption);
  }

  getPayments(owner) {
    let token = sessionStorage.getItem('x-lt');
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      })
    }
    
    return this.http.get(url + 'payments/email/' + owner, httpOption);
  }

}
