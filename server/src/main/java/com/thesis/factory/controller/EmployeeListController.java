package com.thesis.factory.controller;

import com.thesis.factory.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeListController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/getAllUser")
    public List getAllUser(){
        return employeeService.getActiv();
    }
}
