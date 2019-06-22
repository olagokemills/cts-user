import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { GlobalService } from 'src/services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: any;
  constructor(private api: AuthService, public global: GlobalService, private router: Router) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.api.getPosts().subscribe(
      res => {
        console.log(res);
        this.posts = res['response'];
      },
      err => console.error()
    )
  }

  goToPostDetails(data) {
    this.global.postDetails = data;
    this.router.navigate(['post-details']);
  }

}
