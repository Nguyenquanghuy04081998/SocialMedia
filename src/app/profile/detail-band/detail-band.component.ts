import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-band',
  templateUrl: './detail-band.component.html',
  styleUrls: ['./detail-band.component.css']
})
export class DetailBandComponent implements OnInit {
  post;
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DetailBandComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.post = data;
    console.log(this.post);
  }

  ngOnInit(): void {}
}
