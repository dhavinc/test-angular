import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent implements OnInit {
  @Input() reviewData;
  constructor() {}

  ngOnInit(): void {
    this.reviewData.summary_short = this.reviewData.summary_short
      ? this.reviewData.summary_short.length > 100
        ? this.reviewData.summary_short.substring(0, 100)
        : this.reviewData.summary_short
      : 'No Summary';
  }
}
