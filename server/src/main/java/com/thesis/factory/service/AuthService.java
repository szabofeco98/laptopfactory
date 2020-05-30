package com.thesis.factory.service;

import com.thesis.factory.config.security.InvalidPasswordException;
import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.service.domain.EmployeeDTO;
import com.thesis.factory.service.domain.RoleDTO;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface AuthService {
     String getAuthenticationStatus(EmployeeDTO employee) throws UsernameNotFoundException, InvalidPasswordException;

     String saveUser(EmployeeDTO employee);

     List<RoleDTO> getAllRole();
}
