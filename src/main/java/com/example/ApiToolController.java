package com.example;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Controller
public class ApiToolController {

    @GetMapping("/apitool")
    public String showPage() {
        return "apitool";
    }

    @PostMapping("/callapi")
    public String callApi(
            @RequestParam String url,
            @RequestParam String method,
            @RequestParam(required = false) String body,
            Model model) {

        RestTemplate restTemplate = new RestTemplate();
        String response = "";

        try {
            // ✅ Fix for relative URL
            if (!url.startsWith("http")) {
                url = "http://localhost:8080" + url;
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(body, headers);

            switch (method.toUpperCase()) {

                case "GET":
                    response = restTemplate.getForObject(url, String.class);
                    break;

                case "POST":
                    response = restTemplate.postForObject(url, entity, String.class);
                    break;

                case "PUT":
                    restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
                    response = "Updated successfully";
                    break;

                case "DELETE":
                    restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);
                    response = "Deleted successfully";
                    break;

                default:
                    response = "Invalid Method";
            }

        } catch (Exception e) {
            response = "Error: " + e.getMessage();
        }

        model.addAttribute("response", response);
        return "apitool";
    }
}