package com.eduardominarelli.employmentcontractmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sample")
public class SampleController {

    @GetMapping("test")
    public List<String> test() {
        return List.of("Jimmy", "Danny", "Francine");
    }
    @GetMapping("test2")
    public void test2() {
        System.out.println("TESTED 2");
    }
}
