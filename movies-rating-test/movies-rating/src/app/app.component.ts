import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 1}),
          animate('0.3ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 0}),
          animate('800ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private fetchReviewsSub: Subscription;
  hasMore = false;
  reviews: any[] = [];
  offset = 0;
  loading = true;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.fetchReviews();
  }
  fetchReviews() {
    this.fetchReviewsSub = this.apiService
      .get(`reviews/picks.json?offset=${this.offset}&order=by-publication-date`)
      .subscribe(
        (results) => {
          this.hasMore = results.has_more;
          this.reviews = [...this.reviews, ...results.results];
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  loadMore() {
    if (this.hasMore) {
      this.offset += 20;
      this.fetchReviews();
    }
  }

  ngOnDestroy() {
    this.fetchReviewsSub.unsubscribe();
  }
}
