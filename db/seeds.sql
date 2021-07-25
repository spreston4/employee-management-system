INSERT INTO department (name) VALUES
("Operations"),
("Human Resources"),
("Finance"),
("Sales"),
("Safety"),
("Quality"),
("Maintenance");

INSERT INTO roles (title, salary, department_id) VALUES
("Operations Manager", 120000, 1),
("Human Resources Manager", 100000, 2),
("Finance Manager", 90000, 3),
("Sales Manager", 110000, 4),
("Safety Manager", 80000, 5),
("Quality Manager", 100000, 6),
("Maintenance Manager", 100000, 7),
("Plant Manager", 150000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Earl", "Washington", 8, 1),
("Tim", "Davis", 1, 1),
("Megan", "Linse", 2, 1),
("Jamie", "Cecil", 3, 1),
("Ralph", "Stayer", 4, 1),
("Tom", "Ayala", 5, 1),
("Kirsten", "Bishir", 6, 1),
("Sam", "Preston", 7, 1);



