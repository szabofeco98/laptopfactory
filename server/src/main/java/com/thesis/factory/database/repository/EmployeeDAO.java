package com.thesis.factory.database.repository;

import com.thesis.factory.database.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface EmployeeDAO extends JpaRepository<Employee,Long> {
    Employee findByUsername(String username);
}
