package com.project.Voting_System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Voting_System.Model.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Integer>{
	boolean existsByUserId(int userId);
	
	long countByCandidateId(int candidateId);
}
