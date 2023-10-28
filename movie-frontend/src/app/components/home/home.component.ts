import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faPlayCircle = faPlayCircle;
	//images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  

	pauseOnHover = true;
	pauseOnFocus = true;

  constructor(public movieService: MovieService, private router: Router){
    this.getMovies();
  }
  getMovies(){
    this.movieService.getMovies();
  }

  handlerPlayButton(imdbId: string){
    this.router.navigate(['/trailer', imdbId]);
  }
  handlerReviewButton(imdbId: string){
    this.router.navigate(['/review', imdbId]);
  }
}
