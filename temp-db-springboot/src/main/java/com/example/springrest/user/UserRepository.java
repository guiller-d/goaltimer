package com.example.springrest.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.example.springrest.model.User;

public interface UserRepository extends JpaRepository<User, Long> {


    //public List<User> findByEmail(@Param("email") String email);
    public List<User> findByEmail(String email);
    

}
