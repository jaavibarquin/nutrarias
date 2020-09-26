import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from '../shared/models/post.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  format: string = 'dd/MM/yyyy HH:mma ';
  public posts$: Observable<PostI[]>;

  constructor(private postSvc: PostService) {}

  ngOnInit() {
    this.posts$ = this.postSvc.getAllPosts();
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
