package com.project.Voting_System.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Voting_System.Model.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {

}
