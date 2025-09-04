package net.broadcast.chatting.domain.user.presentation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.user.presentation.dto.request.SignInRequest;
import net.broadcast.chatting.domain.user.presentation.dto.request.SignUpRequest;
import net.broadcast.chatting.domain.user.presentation.dto.response.SignInResponse;
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
        service.signUp(req.getNickname(), req.getAccountId(), req.getPassword(), req.getRole());
    }

    @PostMapping("/signin")
    public SignInResponse signIn(@RequestBody SignInRequest req) {
        return service.signIn(req.getAccountId(), req.getPassword());
    }
    
}
