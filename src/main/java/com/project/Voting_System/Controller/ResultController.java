package com.project.Voting_System.Controller;

import com.project.Voting_System.Service.ResultService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/result")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {

	private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping
    public List<Map<String, Object>> getResults() {
        return resultService.getResults();
    }
    
}
