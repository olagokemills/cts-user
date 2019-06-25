import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { GlobalService } from 'src/services/global/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CeiboShare } from 'ng2-social-share';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  
})
export class BlogComponent implements OnInit {
  commentForm: FormGroup;
  posts: any;
  cat: any;
  comments: any;
  message = '';
  success = false;
  failure = false;
  constructor(public fb: FormBuilder, private api: AuthService, public global: GlobalService, private router: Router) { }

  ngOnInit() {
    this.getPosts();
    this.commentForm = this.fb.group({

      titleId: ['this.titleId', Validators.required],
      body: ['', Validators.required]
       });
       this.getCategories();
       this.getComments();
  }

  onSubmit(item){
        let data = '';
        console.log(item.titleid);
             data = 'titleid=' + item.titleid +
             '&body=' + this.commentForm.value.body +
            '&username=' + JSON.parse(sessionStorage.getItem('ud')).username +
            '&date=' + new Date().toDateString();

    this.api.postRequest1('posts/comments', data)
        .then(res => {
          console.log(res);
          this.message = 'Comment created successfully';
          this.success = true;

        })
        .catch(err => {
          console.error(err);
          this.failure = true;
        });

        this.getComments();
  }

  getPosts() {
    this.api.getPosts().subscribe(
      res => {
       // console.log(res);
        this.posts = res['response'];
      },
      err => console.error()
    )
  }

  getCategories() {
    this.api.getCategories().subscribe(
      res => {
        //console.log(res);
        this.cat = res['response'];
      },
      err => console.error()
    )
  }

  getComments() {
    this.api.getComments().subscribe(
      res => {
        //console.log(res);
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
