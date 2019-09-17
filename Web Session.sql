use t1;
CREATE TABLE tt(
    Num_id VARCHAR(40) NOT NULL,
    Ser_id INT NOT NULL,
    Funname VARCHAR(20) NOT NULL ,
    Val FLOAT NOT NULL,
    PRIMARY KEY (Num_id)
) ;
use t1;
INSERT INTO t1.State(Num_id,Funname,Ser_id,Val)
    VALUES
    (122342,'mem',1,0.1);
INSERT INTO t1.State(Num_id,Funname,Ser_id,Val)
    VALUES
    (1221357,'mem',2,0.5);
INSERT INTO t1.State(Num_id,Funname,Ser_id,Val)
    VALUES
    (123523,'cpu',2,0.1);
INSERT INTO t1.State(Num_id,Funname,Ser_id,Val)
    VALUES
    (122349,'cpu',1,0.5);
INSERT INTO t1.State(Num_id, Ser_id,Funname,Val) VALUES("123",2,"mem",12.0);
use t1;
CREATE TABLE State(
    Num_id int NOT NULL,
    Ser_id INT NOT NULL,
    Funname VARCHAR(20) NOT NULL ,
    Val FLOAT NOT NULL,
    PRIMARY KEY (Num_id)
) ;
SELECT * FROM t1.State;

DELETE FROM t1.STATE ;



CREATE TABLE t1.usertable(
    username VARCHAR(40) NOT NULL,
    password VARCHAR(50) NOT NULL,
    usergrade INT NOT NULL ,
    PRIMARY KEY (username)
) ;
SELECT * FROM  t1.usertable;
INSERT into t1.usertable(username,password,usergrade)
VALUEs (
    'root',
    '123',
    1
);
INSERT INTO State(Num_id, Ser_id,Funname,Val) VALUES
Drop TABLE t1.;

ALTER TABLE t1.usertable CHANGE passward password CHAR(50);

UPDATE usertable SET password = ? where username = ?;

SELECT * FROM State where Funname = 'cpu' order  by Num_id asc
SELECT * FROM t1.State order by Num_id asc limit 1;