package com.example.onlineschedule.scheduler;

import com.example.onlineschedule.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SchedulerRepository extends JpaRepository<Scheduler, Long> {
    @Query(" SELECT s FROM Scheduler s" +
            " WHERE s.user1.email = :userEmail ORDER BY s.startTime ASC")
    List<Scheduler> findByUserEmail(@Param("userEmail") String userId);

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            " FROM Scheduler s" +
            " WHERE (((s.user1 = :user1 OR s.user2 = :user1) OR (s.user1 = :user2 OR s.user2 = :user2)) " +
            " AND ((s.startTime < :endTime AND s.startTime >= :startTime) OR (s.endTime > :startTime AND s.endTime <= :endTime)))")
    Boolean ifConflictingSchedulers(@Param("user1") User user1,
                                              @Param("user2") User user2,
                                              @Param("startTime") LocalDateTime startTime,
                                              @Param("endTime") LocalDateTime endTime);
}
