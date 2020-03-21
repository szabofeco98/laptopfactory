package com.thesis.factory.service;

import com.thesis.factory.config.security.InvalidPasswordException;
import com.thesis.factory.database.entity.Employee;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AuthService {
     String isAuthenticated(Employee employee) throws UsernameNotFoundException, InvalidPasswordException;
}
