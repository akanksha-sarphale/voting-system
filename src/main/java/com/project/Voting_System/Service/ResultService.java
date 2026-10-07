package com.project.Voting_System.Service;

import com.project.Voting_System.Model.Candidate;
import com.project.Voting_System.Repository.CandidateRepository;
import com.project.Voting_System.Repository.VoteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResultService {

	private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;

    public ResultService(CandidateRepository candidateRepository,
                         VoteRepository voteRepository) {
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
    }

    public List<Map<String, Object>> getResults() {

        List<Candidate> candidates = candidateRepository.findAll();

        List<Map<String, Object>> results = new ArrayList<>();

        for (Candidate candidate : candidates) {

            Map<String, Object> result = new HashMap<>();

            result.put("id", candidate.getId());
            result.put("name", candidate.getName());
            result.put("party", candidate.getParty());
            result.put("position", candidate.getPosition());

            long totalVotes =
                    voteRepository.countByCandidateId(candidate.getId());

            result.put("totalVotes", totalVotes);

            results.add(result);
        }

        return results;
    }
    
}
