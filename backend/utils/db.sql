CREATE TABLE IF NOT EXISTS User (
    id       INTEGER PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    isAdmin  BOOLEAN NOT NULL DEFAULT FALSE
);