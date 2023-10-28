import {
  Injectable,
  WritableSignal,
  signal,
  computed,
  Signal,
} from '@angular/core';
import { Movie } from '../models/movie';
import { HttpService } from './http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: WritableSignal<Movie[]> = signal([]);
  // imdbId: WritableSignal<string> = signal('');

  constructor(
    private httpService: HttpService,
    private sanitizer: DomSanitizer
  ) {}

  selectedMovie: WritableSignal<Movie> = signal(this.defaultMovie());

  // selectedMovie: Signal<Movie> = computed(() => {
  //   if (this.movies()) {
  //     const tempMovie = this.movies().find(
  //       (movie) => movie.imdbId === this.imdbId()
  //     );
  //     if (tempMovie) {
  //       return tempMovie;
  //     }
  //   }
  //   return this.defaultMovie();
  // });

  embeddedTrailerLink: Signal<SafeResourceUrl> = computed(() => {
    if (this.selectedMovie()) {
      const videoId = this.getTheVideoId(this.selectedMovie().trailerLink);
      if (videoId) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0`
        );
      }
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('');
  });

  defaultMovie(): Movie {
    return {
      imdbId: '',
      title: '',
      releaseDate: '',
      trailerLink: '',
      poster: '',
      genres: [],
      backdrops: [],
      reviewIds: [],
    };
  }

  getMovies() {
    this.httpService.getMovies().subscribe((data) => {
      this.movies.set(data);
    });
  }

  getTheVideoId(url: string) {
    return url.substring(url.indexOf('?v=') + 3);
  }

  getMovieByImdbId(imdbId: string){
    return this.httpService.getMovieByImdbId(imdbId).subscribe(
      data =>{
        this.selectedMovie.set(data);
      }
    );
  }
}
