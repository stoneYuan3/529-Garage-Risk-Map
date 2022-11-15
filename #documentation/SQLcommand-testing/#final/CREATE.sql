
CREATE TABLE postal_code_map (
    id INT NOT NULL AUTO_INCREMENT,
    properties LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    num_of_cases int(10) NOT NULL
    CHECK (JSON_VALID(`properties`)),
 	PRIMARY KEY (id)
);

CREATE TABLE bikes(
	id int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    serial_number varchar(30),
    nickname varchar(30),
    manufacturer varchar(30),
    model varchar(30) NOT NULL,
    value int(10) NOT NULL,
    type varchar(30) NOT NULL
);

CREATE TABLE theft_report(
	case_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    bike_id int(10) UNSIGNED NOT NULL,
    report_date DATETIME NOT NULL,
    postal_code VARCHAR(3),
    description TEXT,
    
    PRIMARY KEY(case_id, bike_id),
    FOREIGN KEY (bike_id) REFERENCES bikes(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE images(
    img_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	bike_id int(10) UNSIGNED NOT NULL,
    img_link TEXT NOT NULL,
    
    PRIMARY KEY(img_id,bike_id),
    FOREIGN KEY (bike_id) REFERENCES bikes(id) ON DELETE CASCADE ON UPDATE CASCADE
);