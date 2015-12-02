-- Categories
INSERT INTO User (username, password, isAdmin, blogname) VALUES (
    'admin', '123qwe', TRUE, 'Admin\'s Blog'
);
INSERT INTO User (username, password, isAdmin, blogname) VALUES (
    'tester', '123qwe', TRUE, 'Testers\'s Blog'
);

-- Categories
INSERT INTO Category (name) VALUES ('Sport');
INSERT INTO Category (name) VALUES ('Auto');
INSERT INTO Category (name) VALUES ('Freizeit');
INSERT INTO Category (name) VALUES ('Klatsch & Tratsch');
