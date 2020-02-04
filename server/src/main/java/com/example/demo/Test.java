package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("")
public class Test {
    @Autowired
    DbDAO dbDAO;

    @PostMapping("put")
    public DbEnt put(@RequestBody DbEnt dbEnt){
        DbEnt db=dbDAO.save(dbEnt);
        System.out.println(db);
        return db;
    }

    @GetMapping("getAll")
    public List getAll(){
        System.out.println(dbDAO.findAll());
        return dbDAO.findAll();
    }
}
