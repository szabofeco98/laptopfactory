package com.thesis.factory.config.security;

import com.thesis.factory.database.entity.Employee;
import com.thesis.factory.database.entity.Role;
import com.thesis.factory.database.repository.EmployeeDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserDetialService implements UserDetailsService {
    @Autowired
    private EmployeeDAO employeeDAO;


    @Override
    public UserDetails loadUserByUsername(final String username)
            throws UsernameNotFoundException {

        Employee user = employeeDAO.findByUsername(username);
        User realUser;
        List<GrantedAuthority> authorities;

        if(user != null && user.getRole() !=null) {
            authorities=buildUserAuthority(user.getRole());
            realUser=buildUserForAuthentication(user,authorities);
        }else {
            throw new UsernameNotFoundException("User "+ username + "not found");
        }
        return realUser;
    }


    private User buildUserForAuthentication(Employee user, List<GrantedAuthority> authorities) {
        return new User(user.getUsername(), user.getPassword(),
                true, true, true, true, authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(Role userRoles) {

        Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();
        setAuths.add(new SimpleGrantedAuthority(userRoles.getRole()));
        System.out.println("ez ni" + new ArrayList<>(setAuths));
        return  new ArrayList<>(setAuths);
    }

}
