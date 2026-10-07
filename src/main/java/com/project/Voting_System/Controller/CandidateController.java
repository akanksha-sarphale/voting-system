package com.project.Voting_System.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.Voting_System.Model.Candidate;
import com.project.Voting_System.Repository.CandidateRepository;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {

	@Autowired
    private CandidateRepository repo;

	// GET all candidates
    @GetMapping
    public List<Candidate> getAllCandidates() {
        return repo.findAll();
    }

    // ADD candidate
    @PostMapping
    public Candidate addCandidate(@RequestBody Candidate candidate) {
        return repo.save(candidate);
    }

    // UPDATE candidate
    @PutMapping("/{id}")
    public Candidate updateCandidate(
            @PathVariable int id,
            @RequestBody Candidate candidate) {

        Optional<Candidate> existingCandidate = repo.findById(id);

        if (existingCandidate.isPresent()) {

            Candidate existing = existingCandidate.get();

            existing.setName(candidate.getName());
            existing.setParty(candidate.getParty());
            existing.setPosition(candidate.getPosition());

            return repo.save(existing);
        }

        return null;
    }

    // DELETE candidate
    @DeleteMapping("/{id}")
    public String deleteCandidate(@PathVariable int id) {

        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Candidate deleted successfully";
        }

        return "Candidate not found";
    }
}
