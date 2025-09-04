package net.broadcast.chatting.domain.user.presentation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.user.presentation.dto.request.SignInRequest;
import net.broadcast.chatting.domain.user.presentation.dto.request.SignUpRequest;
import net.broadcast.chatting.domain.user.presentation.dto.request.TokenRequest;
import net.broadcast.chatting.domain.user.presentation.dto.response.SignInResponse;
import net.broadcast.chatting.domain.user.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    
    final UserService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public void signUp(@RequestBody SignUpRequest req) {
        service.signUp(req.getNickname(), req.getAccountId(), req.getPassword(), req.getRole());
    }

    @PostMapping("/signin")
    public SignInResponse signIn(@RequestBody SignInRequest req) {
        return service.signIn(req.getAccountId(), req.getPassword());
    }

    @PutMapping("/reissue")
    public SignInResponse reissue(@RequestBody TokenRequest refreshToken) {
        return service.reissue(refreshToken.getToken());
    }
    
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/logout")
    public void logout() {
        service.logout();
    }
}
