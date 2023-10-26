package com.nara.movies.sevice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nara.movies.models.Movie;
import com.nara.movies.repositories.MoviesRepository;

@Service
public class MovieServiceImpl implements MovieService{
	
	@Autowired
	private MoviesRepository moviesRepository;
	
	
	public List<Movie> getAllMovies(){
		return moviesRepository.findAll();
	}


	@Override
	public Optional<Movie> findMovieById(String imdbId) {
		return moviesRepository.findMovieByImdbId(imdbId);
	}

}
