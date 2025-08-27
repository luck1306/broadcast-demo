package net.broadcast.chatting.domain.user.presentation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.user.presentation.dto.request.SignUpRequest;
import net.broadcast.chatting.domain.user.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    
    final UserService service;

    @PostMapping("/signup")
    public void signUp(@RequestBody SignUpRequest req) {
        service.signUp(req.getNickname(), req.getAccountId(), req.getPassword());
    }

    @PostMapping("/signin")
    public String signIn(@RequestBody String entity) {
        return entity;
    }
    
}
