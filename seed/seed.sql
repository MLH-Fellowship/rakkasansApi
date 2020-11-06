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

INSERT INTO users (first_name, last_name) VALUES
  ('John', 'Doe'),
  ('Jose', 'Masa'),
  ('Pedro', 'Picapiedra');

INSERT INTO topics (title, user_id) VALUES
  ('General', 1),
  ('Training', 2),
  ('Events', 2);

INSERT INTO posts (title, body, user_id, topic_id) VALUES
  ('What is the hardest execise?', 'I think its pull ups, but push ups are easy.',1,2),
  ('To fast or not to fast', 'Studies say it can be really healthy. But its craazy',2,2);

INSERT INTO comments (content, user_id, parent_id, post_id) VALUES
  ('No way! A proper squat is incredibly difficult', 1, null, 1),
  ('Anthing with abs for me', 2, null, 1);