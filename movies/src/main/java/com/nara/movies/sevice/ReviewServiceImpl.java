/**
 * 
 */
package com.nara.movies.sevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.nara.movies.models.Movie;
import com.nara.movies.models.Review;
import com.nara.movies.repositories.ReviewRepository;

/**
 * @author Narasimha Mannepalli
 *
 */
@Service	
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public Review createReview(String reviewBody, String imdbId) {
		//inserting review into review table
		Review review = reviewRepository.insert(new Review(reviewBody));
		
		//Now we are mapping this review to movies review attribute for 
		//this we are using mongoTemplate
		mongoTemplate.update(Movie.class)
		.matching(Criteria.where("imdbId").is(imdbId))
		.apply(new Update().push("reviewIds").value(review))
		.first();
		return review;
	}

}
