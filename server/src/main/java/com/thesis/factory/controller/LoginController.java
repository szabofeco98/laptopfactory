package com.thesis.factory.controller;

import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.database.repository.EmployeeDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("")
public class LoginController {
    @Autowired
    EmployeeDAO employeeDAO;

    @PostMapping("/login")
    public boolean login(@RequestBody Employee employee){
        System.out.println(employee);
        System.out.println(employeeDAO.findAll());
        return true;
    }
}
