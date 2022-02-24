INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Marketing'),
    ('Production'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Lead Engineer', 140000, 1),
    ('Senior Engineer', 100000, 1),
    ('Junior Engineer', 85000, 1),
    ('Marketing Lead', 110000, 2),
    ('Marketing Staff', 110000, 2),
    ('Project Manager', 210000, 3),
    ('Production Lead', 100000, 3),
    ('Production Staff', 90000, 3),
    ('Chief Finacial Officer', 250000, 4),
    ('Accountant', 90000, 4),
    ('Budgeting & Forecasting', 65000, 4),
    ('Payroll', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Rick','Sanchez', 1, NULL),
    ('Beth','Smith', 2, 1),
    ('Summer','Smith', 2, 1),
    ('Bird','Person', 3, 1),
    ('Abradolf','Lincler', 3, 1),
    ('Squanch','Eee', 3, 1),
    ('Coach', 'Feratu', 4, NULL ),
    ('Mister','Meeseeks', 5, 7),
    ('Scary','Terry', 5, 7),
    ('Xenon','Bloom', 6, NULL),
    ('Burl','Day', 7, 10),
    ('Revolio ','Clockberg', 8, 10),
    ('Krombopulos','Michael', 8, 10),
    ('BlimBlam','Klorblok', 8, 10),
    ('Arthricia ','Purgeplanet', 9, NULL),
    ('Jaguar','Solenya', 10, 15),
    ('Baby','Legs', 10, 15),
    ('Pichael','Thompson', 10, 15),
    ('Lucius','Needful', 11, 15),
    ('Zeep','Xanflorp', 11, 15),
    ('Morty','Smith', 12, 15),
    ('Jerry','Smith', 12, 15);