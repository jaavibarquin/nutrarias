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
  private image: any;
  constructor(private postSvc: PostService) {}
  public newPostForm = new FormGroup({
    headerPost: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    subtitlePost: new FormControl(''),
    imagePost: new FormControl(''),
    contentPost: new FormControl('', Validators.required),
    datePost: new FormControl('', Validators.required),
  });

  ngOnInit() {}

  addNewPost(data: PostI) {
    this.postSvc.preAddandUpdate(data, this.image);
  }
  handleImage(event: any): void {
    this.image = event.target.files[0];
  }
}
