package com.nara.movies.sevice;

import com.nara.movies.models.Review;

public interface ReviewService {
	
	public Review createReview(String reviewBody, String imdbId);

}
