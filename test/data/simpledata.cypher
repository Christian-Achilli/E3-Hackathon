create (s:System {name:"citissi", csi:"156959", dev_uri:"http://ssiapi-dev.nam.nsroot.net", sit_uri:"http://ssiapi-sit.nam.nsroot.net", uat_uri:"http://ssiapi-uat.nam.nsroot.net"})
return s

match (s:System {name:"citissi"})
create (s)-[:CONNECT]->(s1:System {name:"Monet", csi:"111111"})
create (s)-[:CONNECT]->(s2:System {name:"tml", csi:"222222"})
create (s)-[:CONNECT]->(s3:System {name:"PRIMO", csi:"3333333"})
create (s)<-[:CONNECT]-(s4:System {name:"esales", csi:"34428"})
return s, s1, s2, s3, s4

match (citissi:System {name:"citissi"})
match (primo:System {name:"PRIMO"})
create (citissi)-[:CONNECT]->(cloud:System {name:"ISGCloud", csi:"999999"})
create (cloud)-[:CONNECT]->(primo)
return citissi, cloud, primo