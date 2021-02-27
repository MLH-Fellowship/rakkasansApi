DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS 
  users (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

DROP TABLE IF EXISTS topics;

CREATE TABLE IF NOT EXISTS 
  topics (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT REFERENCES users (id) NOT NULL
  );

DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS 
  posts (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    body TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT REFERENCES users (id) NOT NULL,
    topic_id INT REFERENCES topics (id) NOT NULL
  );

DROP TABLE IF EXISTS comments;

CREATE TABLE IF NOT EXISTS 
  comments (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT REFERENCES users (id) NOT NULL,
    parent_id INT REFERENCES comments (id) DEFAULT NULL,
    post_id INT REFERENCES posts (id) NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  fallen (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    last_name TEXT,
    first_name TEXT,
    rank TEXT,
    date DATE,
    battalion TEXT,
    unit TEXT,
    location TEXT,
    campaign TEXT
  );

\copy fallen(last_name, first_name, rank, date, battalion, unit, location, campaign) FROM '/docker-entrypoint-initdb.d/fallen_data.csv' DELIMITER ',' CSV

CREATE TABLE IF NOT EXISTS
  dmor_hmor (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    last_name TEXT,
    first_name TEXT,
    rank TEXT,
    date_accepted TEXT,
    notes TEXT
  );
\copy dmor_hmor(last_name, first_name, rank, date_accepted, notes) FROM '/docker-entrypoint-initdb.d/dmor_hmor_data.csv' DELIMITER ',' CSV

CREATE TABLE IF NOT EXISTS
  battalion (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    batt_name TEXT NOT NULL UNIQUE,
    location TEXT,
    hours TEXT
  );

  INSERT INTO battalion (batt_name, shop_number, location, hours) VALUES
    ('HHC', 'Here', '12:00 - 15:00');

CREATE TABLE IF NOT EXISTS
    shops (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    parent_batt TEXT NOT NULL
    shop_num INT NOT NULL
    )

INSERT INTO users (first_name, last_name) VALUES
  ('Jason', 'Jackson'),
  ('Chloe', 'Ward'),
  ('Shawn', 'Mathis'),
  ('Marta', 'Drake'),
  ('Eric', 'Brett'),
  ('Anton', 'Rankin');

INSERT INTO topics (title, user_id) VALUES
  ('General', 5),
  ('Training', 2),
  ('Army Schools', 3),
  ('Civilian Education', 1),
  ('Army E-Sports', 5),
  ('Events', 2);

INSERT INTO posts (title, body, user_id, topic_id) VALUES
  ('Thoughts on the future of AI?', 'Looks like machines are going to take over',1,1),
  ('How long would you last in the wild alone?', 'I give myself 2 weeks',2,1),
  ('What is the most painful execise?', 'I think its pull ups.',4,2),
  ('To fast or not to fast', 'Studies say it can be really healthy. But its craazy',3,2),
  ('Knee Pain', 'Not sure how to approach squats with weak knees.',4,2),
  ('Best studying practices', 'Look up the Pomodoro Technique. Really helpful to structure studying time.',1,3),
  ('What would you tell a soldier just starting out?', 'Im about to start and dont know what to expect',1,3),
  ('Anyone interesed in Computer Science?', 'Plenty of opportunities and pays well.',3,4),
  ('Cant decided between CS and Math', 'I like science but not sure what route to take.',4,4),
  ('Where are you applying?', 'I thinking of my local college, CCSF.',5,4),
  ('Do ppl still play Overwatch?', 'Or has Fortnite taken over...',5,5),
  ('Thinkin about streaming on Twitch', 'Could be fun, and I already have a good mic.',2,5),
  ('Where can I see all events coming up?', 'Is there a site or calendar?',1,6);

INSERT INTO comments (content, user_id, parent_id, post_id) VALUES
  ('They already did. Its too late!!', 4, null, 1),
  ('You should watch the movie Ex Machina', 1, null, 1),
  ('It was pretty cool', 2, 2, 1),
  ('Depends on the equipment really', 6, null, 2),
  ('Depend on the evnvironment too', 3, 5, 2),
  ('No way! A proper squat is incredibly difficult', 1, null, 3),
  ('Anthing with abs for me', 2, null, 3),
  ('Less food, more problems', 5, null, 4),
  ('Only if you need to lose wieght really quickly', 1, null, 4),
  ('Takes a ton of practice, but its amazing. You can see results really quickly.', 1, 8, 4);