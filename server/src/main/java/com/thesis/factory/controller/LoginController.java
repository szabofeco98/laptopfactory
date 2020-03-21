package com.thesis.factory.controller;

import com.thesis.factory.config.security.InvalidPasswordException;
import com.thesis.factory.config.security.JwtTokenProvider;
import com.thesis.factory.config.security.UserDetialService;
import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.database.repository.EmployeeDAO;
import com.thesis.factory.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
@RequestMapping()
public class LoginController {

    @Autowired
    AuthService authService;

    @PostMapping("/auth")
    public String login(@RequestBody Employee employee){
        System.out.println("Login controller ");
        try {
            return authService.isAuthenticated(employee);
        }catch (UsernameNotFoundException e){
            return "Username not found";
        }catch (InvalidPasswordException e){
            return "Invalid password";
        }
    }

    @GetMapping("/test")
    public boolean test(){
        return true;
    }

}
