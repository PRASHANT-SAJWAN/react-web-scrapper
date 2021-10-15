CREATE DATABASE blogs;

CREATE TABLE blog {
    tag PRIMARY KEY VARCHAR (25),
    creator VARCHAR (50),
    title VARCHAR (50),
    details VARCHAR (50),
}