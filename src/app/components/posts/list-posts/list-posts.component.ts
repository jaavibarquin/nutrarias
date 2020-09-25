import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { PostService } from '../post.service';
import { PostI } from 'src/app/shared/models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css'],
})
export class ListPostsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'idPost',
    'headerPost',
    'titlePost',
    'subtitlePost',
    'datePost',
    'tagsPost',
    'acciones',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postSvc: PostService, public dialog: MatDialog) {}
  ngOnInit() {
    this.postSvc
      .getAllPosts()
      .subscribe((posts) => (this.dataSource.data = posts));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if ((this, this.dataSource.paginator)) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeletePost(post: PostI) {
    Swal.fire({
      title:
        '¿Estás seguro de que deseas borrar el post: \n ' +
        post.titlePost +
        ' ?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar post!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.postSvc.deletePostById(post).then(() => {
          Swal.fire(
            '¡Eliminado!',
            'El post ha sido eliminado correctamente.',
            'success'
          ).catch((error) => {
            Swal.fire(
              '¡Error!',
              'El post no se ha podido eliminar correctamente, vuelve a intentarlo. \n' +
                error,
              'error'
            );
          });
        });
      }
    });
  }
  onEditPost(post: PostI) {
    window.alert('Se va a borrar el post perra' + post.titlePost);
  }
  onNewPost() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result ${result}`);
    });
  }
}
