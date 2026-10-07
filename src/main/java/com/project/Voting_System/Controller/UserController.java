package com.project.Voting_System.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Voting_System.Model.User;
import com.project.Voting_System.Service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	 @Autowired
	    private UserService service;

	    @PostMapping("/register")
	    public User register(@RequestBody User user) {
	        return service.register(user);
	    }

	    @PostMapping("/login")
	    public User login(@RequestBody User user) {
	        return service.login(user.getEmail(), user.getPassword());
	    }
}
