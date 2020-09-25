import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from '../post.service';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  public newPostForm = new FormGroup({
    idPost: new FormControl('', Validators.required),
    headerPost: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    subtitlePost: new FormControl(''),
    imagePost: new FormControl(''),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl(''),
    datePost: new FormControl(''),
  });
  constructor(private postSvc: PostService) {}

  ngOnInit(): void {}
  addNewPost(data: PostI) {
    console.log('NewPost', data);
  }
}
