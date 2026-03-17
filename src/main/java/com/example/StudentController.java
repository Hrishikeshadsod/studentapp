package com.example;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class StudentController {

    @GetMapping("/")
    public String form() {
        return "index";
    }

    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    public String submit(@RequestParam("name") String name,
                         @RequestParam("age") int age,
                         Model model) {

        model.addAttribute("name", name);
        model.addAttribute("age", age);
        System.out.println("Form submitted: " + name + " " + age);
        return "result";
    }
}