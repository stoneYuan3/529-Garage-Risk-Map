


SELECT JSON_VALUE(json, '$.features.properties.territory') AS territory FROM postal_codes_experm_3 WHERE JSON_VALUE(json, '$.features.properties.postal-fsa')='V6A';



SELECT JSON_VALUE(json, '$.features[properties].territory') AS territory FROM postal_codes_experm_3 WHERE JSON_VALUE(json, '$.features[properties].postal-fsa')='V6A';