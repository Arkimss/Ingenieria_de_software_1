-- to create a new database
CREATE DATABASE puertoaventuradb;

-- to use database
use puertoaventuradb;

-- creating a new table
CREATE TABLE user (
  idUser INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  lastName TEXT NOT NULL,
  birthdate DATE NOT NULL,
  email VARCHAR(50) NOT NULL,
  dni INT NOT NULL,
  phoneNumber INT NOT NULL,
  locality VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(10) DEFAULT "user",
  idPuerto INT(6)
);

CREATE TABLE publication (
    idPublication INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idPuerto INT NOT NULL,
    description TEXT NOT NULL,
    plate VARCHAR(255) NOT NULL,
    manga DECIMAL(10, 2) NOT NULL,
    eslora DECIMAL(10, 2) NOT NULL
);

CREATE TABLE publicationtoverify (
    idPublicationToVerify INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idPuerto INT NOT NULL,
    description TEXT NOT NULL,
    plate VARCHAR(255) NOT NULL,
    manga DECIMAL(10, 2) NOT NULL,
    eslora DECIMAL(10, 2) NOT NULL
);

  CREATE TABLE offer (
      idOffer INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(50) NOT NULL,
      idPublication INT NOT NULL,
      description TEXT NOT NULL
  );

-- to show all tables
show tables;

-- to describe table
describe user;
describe publication;
describe publicationtoverify;