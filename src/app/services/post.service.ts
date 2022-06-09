import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { PostI } from 'src/app/shared/models/post.interface';
import { FileI } from '../shared/models/file.interface';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postCollection: AngularFirestoreCollection<PostI>;
  postDoc: AngularFirestoreDocument<PostI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.postCollection = afs.collection<PostI>('posts', (ref) =>
      ref.orderBy('datePost', 'desc')
    );
  }

  public getAllPosts(): Observable<PostI[]> {
    return this.postCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as PostI;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public getOnePost(id: string) {
    this.postDoc = this.afs.doc<PostI>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  public deletePostById(post: PostI) {
    return this.postCollection.doc(post.id).delete();
  }

  public editPostById(post: PostI, newImage?: FileI) {
    if (newImage) {
      this.uploadImage(post, newImage);
    } else {
      return this.postCollection.doc(post.id).update(post);
    }
  }

  public preAddandUpdate(post: PostI, image?: FileI): void {
    if (image) {
      this.uploadImage(post, image);
    }
  }

  private savePostWithImage(post: PostI) {
    const postObj = {
      headerPost: post.headerPost,
      titlePost: post.titlePost,
      subtitlePost: post.subtitlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      datePost: post.datePost,
    };
    if (post.id) {
      return this.postCollection.doc(post.id).update(postObj);
    } else {
      return this.postCollection.add(postObj);
    }
  }

  private uploadImage(post: PostI, imagen: FileI) {
    this.filePath = `imagenes/${imagen.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((urlImage) => {
            this.downloadURL = urlImage;
            post.fileRef = this.filePath;
            post.imagePost = this.downloadURL;
            this.savePostWithImage(post);
          });
        })
      )
      .subscribe();
  }

  public deleteImage(post: PostI) {
    const postObj = post;
    postObj.imagePost = '';
    postObj.fileRef = '';
    return this.postCollection.doc(post.id).update(postObj);
  }
}
