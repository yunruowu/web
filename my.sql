CREATE TABLE IF NOT EXISTS `username_tab`(
   `username` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   PRIMARY KEY ( `username` )
)DEFAULT CHARSET=utf8;

INSERT INTO username_tab ( username, password ) VALUES('xyy','12345');