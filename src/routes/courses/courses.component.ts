import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { GlobalService } from 'src/services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  constructor(private api: AuthService, public global: GlobalService, private router: Router) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.api.getCourses().subscribe(
      res => {
        console.log(res);
        this.courses = res['response'];
      },
      err => console.error()
    )
  }

  goToCourseDetails(data) {
    this.global.courseDetails = data;
    this.router.navigate(['course-details']);
  }

}
