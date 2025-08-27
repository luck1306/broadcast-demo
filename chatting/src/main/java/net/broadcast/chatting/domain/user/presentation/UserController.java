package net.broadcast.chatting.domain.user.presentation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    
    @PostMapping("/signup")
    public String signUp(@RequestBody String entity) {
        return entity;
    }

    @PostMapping("/signin")
    public String signIn(@RequestBody String entity) {
        return entity;
    }
    
}
