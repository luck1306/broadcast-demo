package net.broadcast.chatting.domain.user.domain;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import net.broadcast.chatting.domain.user.domain.type.UserRole;

@lombok.Getter
@lombok.NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@jakarta.persistence.AttributeOverride(name = "id", column = @Column(name = "user_id"))
@jakarta.persistence.Entity
public class User extends net.broadcast.chatting.global.entity.BaseEntity implements UserDetails {

    @Column(length = 16)
    String nickname;

    @Column(nullable = false, unique = true, length = 20)
    String accountId;

    @Column(nullable = false, length = 60)
    String password;

    @Column(nullable = false)
    @Enumerated(jakarta.persistence.EnumType.STRING)
    UserRole userRole;

    @lombok.Builder
    public User(
        String nickname,
        String accountId, 
        String password
    ) {
        this.nickname = nickname;
        this.accountId = accountId;
        this.password = password;
        this.userRole = UserRole.ROLE_USER;
    }

    public User( // For Admin Creating
        String nickname,
        String accountId, 
        String password,
        UserRole userRole
    ) {
        this.nickname = nickname;
        this.accountId = accountId;
        this.password = password;
        this.userRole = userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(this.userRole.name());
        return java.util.List.of(authority);
    }

    @Override
    public String getUsername() {
        return this.nickname;
    }
}
