package com.thesis.factory.service.impl;

import com.thesis.factory.config.security.InvalidPasswordException;
import com.thesis.factory.config.security.JwtTokenProvider;
import com.thesis.factory.config.security.UserDetialService;
import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.database.repository.EmployeeDAO;
import com.thesis.factory.database.repository.RoleDAO;
import com.thesis.factory.service.AuthService;
import com.thesis.factory.service.domain.EmployeeDTO;
import com.thesis.factory.service.domain.RoleDTO;
import com.thesis.factory.service.exception.NotActivUserException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("authService")
public class AuthServiceImpl implements AuthService {
    @Autowired
    private EmployeeDAO employeeDAO;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RoleDAO roleDAO;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public String getAuthenticationStatus(EmployeeDTO employeeDTO)  throws UsernameNotFoundException, InvalidPasswordException{
        String username = employeeDTO.getUsername();
        String password = employeeDTO.getPassword();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            System.out.println(employeeDTO);
            Employee emp=employeeDAO.findByUsername(employeeDTO.getUsername());
            if(!emp.getIsActiveWorker()) throw new NotActivUserException();
        }catch (AuthenticationException | NotActivUserException e){
            return "Invalid username and password pair";
        }

        RoleDTO roleDTO=modelMapper.map(employeeDAO.findByUsername(username).getRole(),RoleDTO.class);
        return jwtTokenProvider.createToken(username, roleDTO);
    }

    @Override
    public String saveUser(EmployeeDTO employeeDTO) {
        Employee saved = modelMapper.map(employeeDTO, Employee.class);

        if (saved.getPassword() == null) {
            saved.setPassword("test");
        }
        saved.setPassword(new BCryptPasswordEncoder().encode(saved.getPassword()));
        if(employeeDTO.getIsActiveWorker()==null) {
            saved.setIsActiveWorker(true);
        }

        if(employeeDTO.getId()!=null){
            Employee employee=employeeDAO.findById(employeeDTO.getId()).get();
            if(employee.getPassword().equals(employeeDTO.getPassword())){
                saved.setPassword(employee.getPassword());
            }
        }

        employeeDAO.save(saved);
        return "success";
    }

    @Override
    public List<RoleDTO> getAllRole() {
        return roleDAO.findAll().stream()
                .map(x->modelMapper.map(x,RoleDTO.class))
                .collect(Collectors.toList());
    }
}
