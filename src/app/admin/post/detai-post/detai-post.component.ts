import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DetailBandComponent } from 'src/app/profile/detail-band/detail-band.component';

@Component({
  selector: 'app-detai-post',
  templateUrl: './detai-post.component.html',
  styleUrls: ['./detai-post.component.css']
})
export class DetaiPostComponent implements OnInit {

  post;
  constructor(public dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<DetaiPostComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.post = data;
    }

  ngOnInit(): void {
  }
  getVideo(){
    return 'https://www.youtube.com/embed/'+this.post.video;
  }
  openDialog(post){
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.data = post;
    dialogConfig.height = '50%';
    dialogConfig.width = '50%';
    
    const dialogRef = this.dialog.open(DetailBandComponent,dialogConfig);

   
    
  }

}
