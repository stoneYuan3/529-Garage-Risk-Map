--select certain elements, using JSON_VALUE to reach elements under the JSON value
SELECT id,JSON_VALUE(properties, '$.properties.postal-fsa') AS postal_code,JSON_VALUE(properties, '$.properties.territory') AS territory 

FROM postal_codes_experm_2 

WHERE JSON_VALUE(properties, '$.properties.postal-fsa')='V6B';


SELECT id,JSON_VALUE(properties, '$.properties.postal-fsa') AS postal_code,JSON_VALUE(properties, '$.properties.territory') AS territory, JSON_VALUE(properties, '$.geometry.type') AS shape_type FROM postal_codes_experm_2 WHERE JSON_VALUE(properties, '$.properties.postal-fsa')='V6B';

--reconstructing the complete JSON file
--verified working at 111-11-01 5:45pm
SELECT 
  JSON_MERGE(
    JSON_OBJECT(
        'type',type), 
    properties) AS data
FROM postal_codes_experm_2