CREATE DATABASE railway_reservation_system;
GO

USE railway_reservation_system;

-- Admin Table
CREATE TABLE admins (
    admin_id INT PRIMARY KEY IDENTITY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Passenger Table
CREATE TABLE passenger (
    passenger_id INT PRIMARY KEY IDENTITY not null ,
    P_name VARCHAR(50) NOT NULL,
    contact NVARCHAR(20) NOT NULL,
    Addres NVARCHAR(50),
    gender VARCHAR(50),
    username NVARCHAR(50)  NOT NULL,
    passward NVARCHAR(50) NOT NULL
);

-- Staff Table
CREATE TABLE staff (
    staff_id INT PRIMARY KEY IDENTITY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    shift_timing VARCHAR(50),
    contact VARCHAR(20) NOT NULL,
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(100) NOT NULL
);

-- Train Table
CREATE TABLE train (
    train_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    source_station VARCHAR(100) NOT NULL,
    destination_station VARCHAR(100) NOT NULL,
    arrival_time DATETIME NOT NULL
);

-- Ticket Table
CREATE TABLE ticket (
    ticket_id INT PRIMARY KEY IDENTITY,
    passenger_id INT FOREIGN KEY REFERENCES passenger(passenger_id),
    train_id INT FOREIGN KEY REFERENCES train(train_id),
    booking_date DATETIME null,
    travel_date DATETIME NULL,
    seat_no VARCHAR(20) NOT NULL
);



select * from passenger


select * from staff