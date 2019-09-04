use t1;
CREATE TABLE tt(
    Num_id VARCHAR(40) NOT NULL,
    Ser_id INT NOT NULL,
    Funname VARCHAR(20) NOT NULL ,
    Val FLOAT NOT NULL,
    PRIMARY KEY (Num_id)
) ;
use t1;
INSERT INTO tes (Num_id,Funname,Ser_id,Val)
    VALUES
    (12,'cpu',1,0.1);

use t1;
CREATE TABLE State(
    Num_id VARCHAR(40) NOT NULL,
    Ser_id INT NOT NULL,
    Funname VARCHAR(20) NOT NULL ,
    Val FLOAT NOT NULL,
    PRIMARY KEY (Num_id)
) ;
