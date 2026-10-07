package com.project.Voting_System.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Voting_System.Service.VoteService;

@RestController
@RequestMapping("/api/vote")
@CrossOrigin(origins = "http://localhost:3000")
public class VoteController {

	  @Autowired
	    private VoteService service;

	    @PostMapping
	    public String vote(@RequestParam int userId, @RequestParam int candidateId) {
	        return service.castVote(userId, candidateId);
	    }
}
