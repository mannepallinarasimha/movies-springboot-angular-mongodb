package com.nara.movies.sevice;

import java.util.List;
import java.util.Optional;

import com.nara.movies.models.Movie;

public interface MovieService {
	
	public List<Movie> getAllMovies();
	
	public Optional<Movie> findMovieById(String imdbId);

}
