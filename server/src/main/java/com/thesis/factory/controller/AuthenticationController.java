package com.thesis.factory.controller;

import com.thesis.factory.config.security.InvalidPasswordException;
import com.thesis.factory.config.security.JwtTokenProvider;
import com.thesis.factory.config.security.UserDetialService;
import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.database.repository.EmployeeDAO;
import com.thesis.factory.service.AuthService;
import com.thesis.factory.service.domain.EmployeeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@CrossOrigin
@RequestMapping()
@RestController
public class AuthenticationController {

    @Autowired
    AuthService authService;

    @PostMapping("/auth")
    public String login(@RequestBody EmployeeDTO employee){
        return authService.getAuthenticationStatus(employee);
    }

    @PostMapping("/signup")
    public String signup(@RequestBody EmployeeDTO employee){
        return authService.saveUser(employee);
    }

    @GetMapping("/roles")
    public List getRoles(){
        return authService.getAllRole();
    }
}
