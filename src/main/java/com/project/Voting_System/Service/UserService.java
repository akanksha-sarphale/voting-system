package com.project.Voting_System.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Voting_System.Model.User;
import com.project.Voting_System.Repository.UserRepository;

@Service
public class UserService {

	 @Autowired
	    private UserRepository userRepo;

	 private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	 
	    public User register(User user) {
	    	
	    	// Check if email already exists 
	    	if (userRepo.findByEmail(user.getEmail()) != null) { 
	    		return null; }
	    	
	        user.setVerified(false);
	        user.setHasVoted(false);
	        return userRepo.save(user);
	    }

	    public User login(String email, String password) {
	        User user = userRepo.findByEmail(email);
	        if(user != null && user.getPassword().equals(password)) {
	            return user;
	        }
	        return null;
	    }
}
