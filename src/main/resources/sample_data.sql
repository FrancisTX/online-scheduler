--sample user data
INSERT INTO users (username, email, password)
VALUES ('John_Doe', 'johndoe@example.com', 'mypassword');

-- User 2
INSERT INTO users (username, email, password)
VALUES ('Alice_Smith', 'asmith@example.com', 'mypassword2');

-- User 3
INSERT INTO users (username, email, password)
VALUES ('Bob_Johnson', 'bjohnson@example.com', 'mypassword3');

-- User 4
INSERT INTO users (username, email, password)
VALUES ('Grace_Davis', 'gdavis@example.com', 'mypassword4');

-- User 5
INSERT INTO users (username, email, password)
VALUES ('Mark_Lee', 'mlee@example.com', 'mypassword5');

-- User 6
INSERT INTO users (username, email, password)
VALUES ('Karen_Garcia', 'kgarcia@example.com', 'mypassword6');

--sample scheduler data
-- Scheduler 1
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (1, 2, '2023-05-11 10:00:00', '2023-05-11 11:00:00');

-- Scheduler 2
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (2, 3, '2023-05-12 14:00:00', '2023-05-12 16:00:00');

-- Scheduler 3
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (3, 4, '2023-05-13 11:00:00', '2023-05-13 12:00:00');

-- Scheduler 4
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (4, 5, '2023-05-14 15:00:00', '2023-05-14 17:00:00');

-- Scheduler 5
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (5, 6, '2023-05-15 09:00:00', '2023-05-15 11:00:00');

-- Scheduler 6
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (1, 4, '2023-05-16 14:00:00', '2023-05-16 15:30:00');

-- Scheduler 7
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (2, 5, '2023-05-17 11:00:00', '2023-05-17 12:00:00');

-- Scheduler 8
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (3, 6, '2023-05-18 15:00:00', '2023-05-18 18:00:00');

-- Scheduler 9
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (1, 3, '2023-05-19 10:00:00', '2023-05-19 12:00:00');

-- Scheduler 10
INSERT INTO scheduler (user1_id, user2_id, start_time, end_time)
VALUES (4, 6, '2023-05-20 13:00:00', '2023-05-20 14:00:00');
