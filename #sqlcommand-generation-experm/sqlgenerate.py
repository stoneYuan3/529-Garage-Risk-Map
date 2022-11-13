

import json

#json_data = '{"python": 1, "php": 2, "c": 3, "vb": 4, "perl": 5}'

#json_load = (json.loads(json_data))

#print(json.dumps(json_load, indent=4))

with open('postal-code-raw.json', 'r') as source:
    loadjson = json.load(source)

#postal-code-raw.json is a json array and sometimes we have to use integer to refer to the spscific element
    
#print(loadjson)
#print(loadjson[0]['features'][0]['type'])
#print(loadjson[0]['features'][0]['properties'])

#loadjson[0] refers to each coordinate
#loadjson[0]['features'] refers to each coordinate, excluding type:featureCollection
#print(loadjson[0]['features']) outputs the same content as print(loadjson[0]['features'][0])
#but the result of print(loadjson[0]['features']) is a json array
#while print(loadjson[0]['features'][0]) is just a json object

#print(loadjson[0]['features'][0])
#print(loadjson)

#JSON has to use double quote, if not, the following result will occur when inserting:
#4025 - CONSTRAINT `postal_codes_experm_2.properties` failed for `geodatatest`.`postal_codes_experm_2`
#use json.dump to stop python from auto changing double quote to single quote
#when exporting

# result_each=loadjson[0]["features"][0]
# result_each_doubleQuote=json.dumps(result_each)
# print(str(result_each_doubleQuote))
# #print(len(loadjson))

# result_each_final=str(result_each_doubleQuote)

# sqlTableName="postal_codes_experm_2"
# sqlLine1="INSERT INTO "+sqlTableName+"(properties)"
# sqlLine2="VALUES('"+result_each_final+"')"

file=open('output.sql','a')
# i=0
for i in range(len(loadjson)):
    result_each_doubleQuote=json.dumps(loadjson[i]["features"][0])
    result_each_final=str(result_each_doubleQuote)

    # print(loadjson[i]["features"][0]["properties"]["postal-fsa"]);
    result_postal_code=loadjson[i]["features"][0]["properties"]["postal-fsa"];

    sqlTableName="postal_code_map"
    sqlLine1="INSERT INTO "+sqlTableName+"(properties,postal_code,num_of_cases)"
    sqlLine2=" VALUES('"+result_each_final+"','" + result_postal_code + "',0); "    
    # print(sqlLine2)
    # file.write(result_each)
    file.write(sqlLine1)
    file.write(sqlLine2)
    

file.close()
