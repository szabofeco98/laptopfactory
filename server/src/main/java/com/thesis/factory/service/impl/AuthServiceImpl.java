package com.thesis.factory.service.impl;

import com.thesis.factory.config.security.InvalidPasswordException;
import com.thesis.factory.config.security.JwtTokenProvider;
import com.thesis.factory.config.security.UserDetialService;
import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.database.repository.EmployeeDAO;
import com.thesis.factory.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("authService")
public class AuthServiceImpl implements AuthService {
    @Autowired
    private EmployeeDAO employeeDAO;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String isAuthenticated(Employee employee)  throws UsernameNotFoundException, InvalidPasswordException{
        String username=employee.getUsername();
        String password=employee.getPassword();
        Employee employeeFromDb=employeeDAO.findByUsername(username);

        if(employeeFromDb==null) throw new UsernameNotFoundException(username +" not found");
        if(!employeeFromDb.getPassword().equals(password)) throw new InvalidPasswordException();

        return jwtTokenProvider.createToken(username, employeeFromDb.getRole());
    }
}
