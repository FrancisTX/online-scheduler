package com.example.onlineschedule.scheduler;

import com.example.onlineschedule.exception.DuplicateResourceException;
import com.example.onlineschedule.user.User;
import com.example.onlineschedule.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@AllArgsConstructor
@Service
public class SchedulerService {
    private SchedulerRepository schedulerRepository;

    public List<Scheduler> getAllSchedulers() {
        return schedulerRepository.findAll();
    }
    public void addScheduler(Scheduler scheduler) {
        Boolean conflictingSchedulers = schedulerRepository.ifConflictingSchedulers(
                                                    scheduler.getUser1(),
                                                    scheduler.getUser2(),
                                                    scheduler.getStartTime(),
                                                    scheduler.getEndTime());
        if (conflictingSchedulers) {
            throw new DuplicateResourceException("There is a conflict with an existing schedule");
        }

        schedulerRepository.save(scheduler);
    }

    public List<Scheduler> getSchedulersByUserEmail(String userEmail) {
        return schedulerRepository.findByUserEmail(userEmail);
    }
}