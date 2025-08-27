package net.broadcast.chatting.domain.user.domain.repository;

import java.util.Optional;
import java.util.UUID;

import net.broadcast.chatting.domain.user.domain.User;

public interface UserRepository extends org.springframework.data.jpa.repository.JpaRepository<User, UUID> {
    
    boolean existsByAccountId(String accountId);

    Optional<User> findByAccountId(String accountId);
    
}
