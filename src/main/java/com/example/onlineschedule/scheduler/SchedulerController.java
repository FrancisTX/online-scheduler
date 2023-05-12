package com.example.onlineschedule.scheduler;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping("/api/schedules")
public class SchedulerController {
    private SchedulerService schedulerService;
    @GetMapping
    public List<Scheduler> getAllSchedulers() {
        return schedulerService.getAllSchedulers();
    }
    @PostMapping
    public void addScheduler(@RequestBody Scheduler scheduler) {
        schedulerService.addScheduler(scheduler);
    }

    @GetMapping(path = "{userEmail}")
    public List<Scheduler> getSchedulersByUserEmail(@PathVariable("userEmail") String userEmail) {
        return schedulerService.getSchedulersByUserEmail(userEmail);
    }
}
