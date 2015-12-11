-- Users
INSERT INTO User (username, password, isAdmin) VALUES (
    "admin",
    "$2y$10$dh/z8/tIy004AtZRkMgM3u3YUEnMmWX60H6hM/4d2oyiKrA/J5S1.",
    1
);

INSERT INTO User (username, password, isAdmin) VALUES (
    "tester",
    "$2y$10$iF9FrWg5PSFsjaGPozLmde3.IT/W0s6a2FlwepvcWGHpU0YWiFo.a",
    0
);

-- Blogs
INSERT INTO Blog (userID, name) VALUES (
    1,
    "Admin's Blog"
);

INSERT INTO Blog (userID, name) VALUES (
    2,
    "Testers's Blog"
);

-- Categories
INSERT INTO Category (name) VALUES ("Sport");
INSERT INTO Category (name) VALUES ("Auto");
INSERT INTO Category (name) VALUES ("Freizeit");
INSERT INTO Category (name) VALUES ("Klatsch & Tratsch");
