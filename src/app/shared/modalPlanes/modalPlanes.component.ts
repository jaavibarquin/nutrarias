import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modalPlanes',
  templateUrl: './modalPlanes.component.html',
  styleUrls: ['./modalPlanes.component.css'],
})
export class ModalPlanesComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ModalPlanesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
