import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + sessionStorage.getItem('x-t')
  })
}

const url = 'https://projects.thealmondmedia.com/ola/cts/api/';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  checkForJWT() {
    return this.http.get(url + 'authorise');
  }

  getAllEvents() {
    return this.http.get(url + 'events', httpOptions);
  }
}
