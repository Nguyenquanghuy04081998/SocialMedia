import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TagsService } from 'src/app/core/services/tags.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {
  tags: string[];
  @Output() nameTag = new EventEmitter();
  subcribe: Subscription;

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.subcribe = this.tagsService.getTag().subscribe(dataTag => {
      this.tags = dataTag.tags;
    });
  }

  getNameTag(nameTag) {
    this.nameTag.emit(nameTag);
  }

  ngOnDestroy() {
    this.subcribe.unsubscribe();
  }
}
