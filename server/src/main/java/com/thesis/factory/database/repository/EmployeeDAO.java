package com.thesis.factory.database.repository;

import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.database.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface EmployeeDAO extends JpaRepository<Employee,Long> {
    Employee findByUsername(String username);

    List<Employee> findByIsActiveWorker(Boolean activity);

    List<Employee> findByRole(Role role);
}
