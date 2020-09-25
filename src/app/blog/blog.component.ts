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
  public posts$: Observable<PostI[]>;
  public posts: {
    idPost: string;
    headerPost: string;
    titlePost: string;
    subtitlePost?: string;
    imagePost?: string;
    contentPost?: string;
    tagsPost?: string;
    fileRef?: string;
    datePost?: Date;
  }[] = [
    {
      idPost: '1',
      headerPost: 'aaaaa',
      titlePost: 'bbbbbbbb',
      subtitlePost: 'cccccccc',
      imagePost: 'https://picsum.photos/300/200',
      contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
      tagsPost: '',
      fileRef: 'string',
      datePost: new Date(2001, 6, 23),
    },
    {
      idPost: '1',
      headerPost: 'eeeeee',
      titlePost: 'lllll',
      subtitlePost: 'oooo0000',
      imagePost: 'https://picsum.photos/id/1020/300/200',
      contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
      tagsPost: 'perro, perra',
      fileRef: 'string',
      datePost: new Date(2001, 6, 23),
    },
  ];
  constructor(private postSvc: PostService) {}

  ngOnInit() {
    this.posts$ = this.postSvc.getAllPosts();
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
