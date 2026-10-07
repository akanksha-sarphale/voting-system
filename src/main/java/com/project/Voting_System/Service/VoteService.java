package com.project.Voting_System.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Voting_System.Model.User;
import com.project.Voting_System.Model.Vote;
import com.project.Voting_System.Repository.UserRepository;
import com.project.Voting_System.Repository.VoteRepository;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepo;

    @Autowired
    private UserRepository userRepo;

    public String castVote(int userId, int candidateId) {

        // Check if user exists
        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            return "User not found!";
        }

        // Check if user has already voted
        if (voteRepo.existsByUserId(userId)) {
            return "You have already voted!";
        }

        // Save vote
        Vote vote = new Vote();
        vote.setUserId(userId);
        vote.setCandidateId(candidateId);

        voteRepo.save(vote);

        // Mark user as voted
        user.setHasVoted(true);
        userRepo.save(user);

        return "Vote Cast Successfully!";
    }
}