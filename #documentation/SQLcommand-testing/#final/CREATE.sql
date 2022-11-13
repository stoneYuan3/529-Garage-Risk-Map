
CREATE TABLE postal_code_map (
    id INT NOT NULL AUTO_INCREMENT,
    properties LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    num_of_cases int(10) NOT NULL
    CHECK (JSON_VALID(`properties`)),
 	PRIMARY KEY (id)
);