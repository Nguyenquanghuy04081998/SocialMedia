import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Article } from 'src/app/core/models';
import { ArticlesService } from 'src/app/core/services/articles.service';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InstroctionUpVideoComponent } from '../instroction-up-video/instroction-up-video.component';
import { stringify } from 'querystring';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  tagField = new FormControl();
  slug: string;
  erorr;
  checkCandiactive: boolean;
  checkType: boolean;
  articleEdit: Article;
  image: File;
  imageEditor = false;

  constructor(
    private articleService: ArticlesService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public sanitizer: DomSanitizer
  ) {
    this.article.tagList = [];
  }
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    video: new FormControl(null)
  });

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.slug = data.slug;
      if (this.slug) {
        this.checkType = true;
        this.apiService
          .get(`/articles/${this.slug}`)
          .subscribe(dataArticleEdit => {
            this.articleEdit = dataArticleEdit.articles;
            this.article.tagList = this.articleEdit.tagList;
            if (this.articleEdit.image) this.imageEditor = true;
          });
      } else {
        this.checkType = false;
      }
    });
  }
  addTag() {
    const tag = this.tagField.value;
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    this.tagField.reset();
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    const dialogRef = this.dialog.open(
      InstroctionUpVideoComponent,
      dialogConfig
    );

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }
  selectImage(event) {
    this.imageEditor = false;
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }
  onSubmit() {
    this.form.value.tagList = this.article.tagList;
    if (this.checkType === true) {
      if (this.form.value.title === '') {
        this.form.value.title = this.articleEdit.title;
      }
      if (this.form.value.description === '') {
        this.form.value.description = this.articleEdit.description;
      }
      if (this.form.value.body === '') {
        this.form.value.body = this.articleEdit.body;
      }
      if (this.form.value.video === null) {
        this.form.value.video = this.articleEdit.video;
      }
    }
    this.articleService
      .saveArticle({ article: this.form.value }, this.slug)
      .subscribe(
        article => {
          if (this.image) {
            const formData = new FormData();
            formData.append('file', this.image);
            this.apiService
              .postImage('/image/upload_image', formData)
              .subscribe(res => {
                const data = {
                  id_article: article.article._id,
                  name_image: res.filename
                };
                this.apiService
                  .post('/image/editImage', { data: data })
                  .subscribe(e => {
                    this.router.navigateByUrl(
                      '/article/' + article.article.slug
                    );
                  }),
                  err => console.log(err);
              });
          } else {
            this.router.navigateByUrl('/article/' + article.article.slug);
          }
        },
        err => {
          this.erorr = err.error.error;
        }
      );
    return (this.checkCandiactive = true);
  }
  getVideo() {
    if (this.articleEdit.video != '') {
      return 'https://www.youtube.com/embed/' + this.articleEdit.video;
    }
  }
  deleteImage() {
    this.imageEditor = false;
    const data = {
      id_article: this.articleEdit._id,
      name_image: ''
    };
    this.apiService
      .post('/image/delete', { data: data })
      .subscribe(e => console.log(e));
  }
  deleteVideo() {
    this.articleEdit.video = '';
    this.form.value.video = '';
  }
}
