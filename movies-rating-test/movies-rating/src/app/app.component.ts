import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private fetchReviewsSub: Subscription;
  hasMore = false;
  reviews: any[] = []
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.fetchReviews()
  }
  fetchReviews(offset = 0) {
    this.fetchReviewsSub = this.apiService
      .get(`reviews/picks.json?offset=${offset}&order=by-publication-date`)
      .subscribe((results) => {
        this.hasMore =  results.has_more;
        this.reviews = [...this.reviews, ...results.results];
        console.log('results', this.reviews);
      });
  }
  ngOnDestroy() {
    this.fetchReviewsSub.unsubscribe();
  }
}
