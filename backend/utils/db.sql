CREATE TABLE IF NOT EXISTS User (
    id       INTEGER PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    isAdmin  BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS Blog (
    id     INTEGER PRIMARY KEY,
    userID INTEGER NOT NULL UNIQUE,
    name   VARCHAR NOT NULL,
    FOREIGN KEY(userID) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Category (
    id       INTEGER PRIMARY KEY,
    name     VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS Post (
    id         INTEGER PRIMARY KEY,
    userID     INTEGER NOT NULL,
    categoryID INTEGER NOT NULL,
    title      VARCHAR NOT NULL,
    content    TEXT    NOT NULL,
    FOREIGN KEY(userID)     REFERENCES User(id),
    FOREIGN KEY(categoryID) REFERENCES Category(id)
);

CREATE TABLE IF NOT EXISTS Comment (
    id         INTEGER PRIMARY KEY,
    userID     INTEGER NOT NULL,
    postID     INTEGER NOT NULL,
    text       TEXT    NOT NULL,
    FOREIGN KEY(userID)     REFERENCES User(id),
    FOREIGN KEY(postID)     REFERENCES Post(id)
);
