-- creating the USERS table
CREATE TABLE users_table  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    _firstName LONGTEXT NOT NULL,
    _lastName LONGTEXT NOT NULL,
    _email LONGTEXT NOT NULL,
    _phone LONGTEXT NOT NULL,
    _password VARCHAR(5000),
    _picture LONGTEXT NOT NULL,
    _isVerified LONGTEXT NOT NULL,
    _status LONGTEXT NOT NULL,
    _wallet LONGTEXT NOT NULL,
    _date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- create sellers account
CREATE TABLE sellers_table  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    _name LONGTEXT NOT NULL,
    _slogan LONGTEXT NOT NULL,
    _country LONGTEXT NOT NULL,
    _abilities LONGTEXT NOT NULL,
    _netWorth LONGTEXT NOT NULL,
    _logo LONGTEXT NOT NULL,
    _category LONGTEXT NOT NULL,
    _staffCount LONGTEXT NOT NULL,
    _address LONGTEXT NOT NULL,
    _code LONGTEXT NOT NULL,
    _isVerified LONGTEXT NOT NULL,
    _status LONGTEXT NOT NULL,
    _date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating the products table
CREATE TABLE products_table  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    _seller_id INT,
    _name LONGTEXT NOT NULL,
    _income LONGTEXT NOT NULL,
    _status LONGTEXT NOT NULL,
    _lastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (_seller_id) REFERENCES sellers_table(id)
);