import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { AuthService } from 'src/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-categoryview-details',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
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
        console.log(res);
        this.comments = res['response'];
      },
      err => console.error()
    )
  }

  gotoCategoryDetails(data){
    this.global.categoryPosts = data;
    this.router.navigate(['category-view']);
  }

}
