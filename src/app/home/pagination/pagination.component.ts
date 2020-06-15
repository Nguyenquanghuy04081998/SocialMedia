import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  length: number;
  @Output() page = new EventEmitter();
  @Output() pageSize = new EventEmitter();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get('/articles').subscribe(article => {
      this.length = article.articles.length;
    });
  }

  setPage(event) {
    this.page.emit(event.pageIndex);
    this.pageSize.emit(event.pageSize);
  }
}
