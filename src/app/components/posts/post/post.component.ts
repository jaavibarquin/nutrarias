import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from 'src/app/shared/models/post.interface';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public post$: Observable<PostI>;
  constructor(private actRoute: ActivatedRoute, private postSvc: PostService) {}

  ngOnInit() {
    const idPost = this.actRoute.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(idPost);
  }
}
