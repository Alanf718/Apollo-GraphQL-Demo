-- Up

CREATE TABLE People (id INTEGER PRIMARY KEY, name TEXT, roleId INTEGER);
CREATE TABLE Teams (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE Members (id INTEGER PRIMARY KEY, peopleId INTEGER, teamId INTEGER);
CREATE TABLE Roles (id INTEGER PRIMARY KEY, name TEXT);

INSERT INTO Roles (id, name) VALUES(1, 'Software Engineer');
INSERT INTO Roles (id, name) VALUES(2, 'Mothware Engineer');
INSERT INTO Roles (id, name) VALUES(3, 'Quality Assurance');

INSERT INTO People (id, name, roleId) VALUES (1, 'Alan Fernandez', 1);
INSERT INTO People (id, name, roleId) VALUES (2, 'Trevor Ewen', 2);
INSERT INTO People (id, name, roleId) VALUES (3, 'Craeg Strong', 3);
INSERT INTO People (id, name, roleId) VALUES (4, 'Charles Fulnecky', 2);
INSERT INTO People (id, name, roleId) VALUES (5, 'Scott Howie', 1);
INSERT INTO People (id, name, roleId) VALUES (6, 'Praveen Kuthari', 2);
INSERT INTO People (id, name, roleId) VALUES (7, 'Clark Jones', 3);

INSERT INTO Teams (id, name) VALUES (1, 'Tools');
INSERT INTO Teams (id, name) VALUES (2, 'Front End');
INSERT INTO Teams (id, name) VALUES (3, 'Server Side');
INSERT INTO Teams (id, name) VALUES (4, 'Research');

INSERT INTO Members (id, peopleId, teamId) VALUES(1, 1, 1);
INSERT INTO Members (id, peopleId, teamId) VALUES(2, 1, 2);
INSERT INTO Members (id, peopleId, teamId) VALUES(3, 2, 3);
INSERT INTO Members (id, peopleId, teamId) VALUES(4, 3, 4);
INSERT INTO Members (id, peopleId, teamId) VALUES(5, 3, 2);
INSERT INTO Members (id, peopleId, teamId) VALUES(6, 4, 2);
INSERT INTO Members (id, peopleId, teamId) VALUES(7, 4, 4);
INSERT INTO Members (id, peopleId, teamId) VALUES(8, 5, 1);
INSERT INTO Members (id, peopleId, teamId) VALUES(9, 5, 4);
INSERT INTO Members (id, peopleId, teamId) VALUES(10, 6, 3);
INSERT INTO Members (id, peopleId, teamId) VALUES(11, 7, 2);

--CREATE TABLE Category (id INTEGER PRIMARY KEY, name TEXT);
--CREATE TABLE Post (id INTEGER PRIMARY KEY, categoryId INTEGER, title TEXT,
--  CONSTRAINT Post_fk_categoryId FOREIGN KEY (categoryId)
--    REFERENCES Category (id) ON UPDATE CASCADE ON DELETE CASCADE);
--INSERT INTO Category (id, name) VALUES (1, 'Business');
--INSERT INTO Category (id, name) VALUES (2, 'Technology');
--
---- Down
--DROP TABLE Category
--DROP TABLE Post;