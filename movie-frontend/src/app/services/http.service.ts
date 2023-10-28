import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  movieApi = '/api/v1/movies';
  reviewApi = 'api/v1/reviews';
  constructor(private http: HttpClient) {}
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieApi);
  }

  postReview(review: PostReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.reviewApi, review);
  }

  getMovieByImdbId(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(this.movieApi + '/' + imdbId);
  }
}

export interface PostReviewRequest {
  imdbId: string;
  reviewBody: string;
}
