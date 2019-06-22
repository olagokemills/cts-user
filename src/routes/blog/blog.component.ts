import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { GlobalService } from 'src/services/global/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  commentForm: FormGroup;
  posts: any;
  categories: any;
  comments: any;
  constructor(public fb: FormBuilder, private api: AuthService, public global: GlobalService, private router: Router) { }

  ngOnInit() {
    this.getPosts();
    this.commentForm = this.fb.group({
      userComment: ['', Validators.required],
       });
       this.getCategories();
       this.getComments();
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

  getCategories() {
    this.api.getCategories().subscribe(
      res => {
        console.log(res);
        this.categories = res['response'];
      },
      err => console.error()
    )
  }

  getComments() {
    this.api.getComments().subscribe(
      res => {
        console.log(res);
        this.comments = res['response'];
      },
      err => console.error()
    )
  }


  goToPostDetails(data) {
    this.global.postDetails = data;
    this.router.navigate(['post-details']);
  }

}
