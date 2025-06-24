-- Drop tables if they exist (in safe order)
DROP TABLE IF EXISTS api_keys;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS clubs;
DROP TABLE IF EXISTS leagues;

-- Leagues table
CREATE TABLE leagues (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  region VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Clubs table
CREATE TABLE clubs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  league_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE SET NULL
);

-- Teams table
CREATE TABLE teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  club_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE SET NULL
);

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name ENUM('referee', 'player', 'coach', 'admin', 'league_manager') NOT NULL
);

-- UserRoles (many-to-many)
CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Matches
CREATE TABLE matches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  home_team_id INT,
  away_team_id INT,
  referee_id INT,
  date DATETIME NOT NULL,
  venue VARCHAR(255),
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (home_team_id) REFERENCES teams(id) ON DELETE SET NULL,
  FOREIGN KEY (away_team_id) REFERENCES teams(id) ON DELETE SET NULL,
  FOREIGN KEY (referee_id) REFERENCES users(id) ON DELETE SET NULL
);

-- API Keys for external integration
CREATE TABLE api_keys (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  api_key VARCHAR(64) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
