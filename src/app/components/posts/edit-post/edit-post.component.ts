import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from '../../../services/post.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  private imagen: any;
  private imageOriginal: string;

  @Input() post: PostI;
  constructor(private postSvc: PostService) {}

  public editPostForm = new FormGroup({
    id: new FormControl('', Validators.required),
    headerPost: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    subtitlePost: new FormControl(''),
    contentPost: new FormControl('', Validators.required),
    imagePost: new FormControl(''),
    datePost: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.imagen = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }

  editPost(post: PostI) {
    if (this.imagen === this.imageOriginal) {
      post.imagePost = this.imageOriginal;
      this.postSvc.editPostById(post);
    } else {
      this.postSvc.editPostById(post, this.imagen);
    }
  }
  handleImage(event: any): void {
    this.imagen = event.target.files[0];
  }

  private initValuesForm(): void {
    this.editPostForm.patchValue({
      id: this.post.id,
      headerPost: this.post.headerPost,
      titlePost: this.post.titlePost,
      subtitlePost: this.post.subtitlePost,
      contentPost: this.post.contentPost,
      datePost: this.post.datePost,
    });
  }
}
