import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostI } from 'src/app/shared/models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postCollection: AngularFirestoreCollection<PostI>;
  constructor(private afs: AngularFirestore) {
    this.postCollection = afs.collection<PostI>('posts');
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

  public getOnePost(idPost: PostI): Observable<PostI> {
    return this.afs.doc<PostI>(`posts/${idPost}`).valueChanges();
  }

  public deletePostById(post: PostI) {
    return this.postCollection.doc(post.idPost).delete();
  }

  public editPostById(post: PostI) {
    return this.postCollection.doc(post.idPost).update(post);
  }
}
