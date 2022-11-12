
ref: https://dzone.com/articles/using-json-in-mariadb


**create a table including all components of the json file as columns
CREATE TABLE locations (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,  
    type CHAR(1) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    attr LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
    CHECK (JSON_VALID(`attr`)),
 	PRIMARY KEY (id)
);

***insert json components to the table
INSERT INTO locations (type, name, latitude, longitude, attr) VALUES 
     ('R', 'Lou Malnatis', 42.0021628, -87.7255662,
  '{"details": {"foodType": "Pizza", "menu": "https://www.loumalnatis.com/our-menu"}, 
     	"favorites": [{"description": "Pepperoni deep dish", "price": 18.75}, 
{"description": "The Lou", "price": 24.75}]}');

**select certain components and certain parts of the attributes
SELECT name, latitude, longitude, JSON_VALUE(attr, '$.details.foodType') AS food_type FROM locations WHERE type = 'R';


***output to normal json
SELECT 
  JSON_MERGE(
    JSON_OBJECT(
        'name', name, 
        'latitude', latitude,
        'Longitude', longitude), 
    attr) AS data
FROM locations
WHERE type = 'R';

results:
{"name": "Lou Malnatis", "latitude": 42.002163, "L...


