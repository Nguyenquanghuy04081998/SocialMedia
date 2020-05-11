import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Article } from 'src/app/core/models';
import { ArticlesService } from 'src/app/core/services/articles.service';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

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

  constructor(
    private articleService: ArticlesService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.article.tagList = [];
  }
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.slug = data.slug;
      if (this.slug) {
        this.checkType = true;
        this.apiService
          .get(`/articles/${this.slug}`)
          .subscribe(dataArticleEdit => {
            this.articleEdit = dataArticleEdit.article;
            this.article.tagList = this.articleEdit.tagList;
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
    }
    this.articleService
      .saveArticle({ article: this.form.value }, this.slug)
      .subscribe(
        article => {
          this.router.navigateByUrl('/article/' + article.article.slug);
        },
        err => (this.erorr = err.error.errors) // title, description
      );
    return (this.checkCandiactive = true);
  }
}
