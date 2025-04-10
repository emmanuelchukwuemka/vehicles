-- creating the USERS table
CREATE TABLE users_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,  -- Unique email for vendors
    phone VARCHAR(20) NOT NULL UNIQUE,  -- Ensuring unique phone numbers
    nationality VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Storing hashed password
    picture TEXT DEFAULT NULL,  -- Store profile picture URL
    is_verified TINYINT(1) NOT NULL DEFAULT 0,  -- 0 = Not Verified, 1 = Verified
    status TINYINT(1) NOT NULL DEFAULT 1,  -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- creating the vendors table
CREATE TABLE vendors_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,  -- Unique email for vendors
    phone VARCHAR(20) NOT NULL UNIQUE,  -- Ensuring unique phone numbers
    nationality VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Storing hashed password
    picture TEXT DEFAULT NULL,  -- Store profile picture URL
    is_verified TINYINT(1) NOT NULL DEFAULT 0,  -- 0 = Not Verified, 1 = Verified
    status TINYINT(1) NOT NULL DEFAULT 1,  -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- create sellers account
CREATE TABLE stores_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    slogan VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    banner TEXT,
    picture TEXT,
    net_worth LONGTEXT NOT NULL,
    logo TEXT,
    wallet LONGTEXT NOT NULL,
    staff_count INT DEFAULT 0,
    address VARCHAR(255) NOT NULL,
    floor_space VARCHAR(50) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,  -- Unique store code
    is_verified TINYINT(1) DEFAULT 0,  -- 0 = Not verified, 1 = Verified
    verified_date TIMESTAMP NULL DEFAULT NULL,
    status TINYINT(1) DEFAULT 1,  -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES vendors_table(id) ON DELETE CASCADE
);

-- creating the product collections table
CREATE TABLE collections_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE
);

-- creating the products table
CREATE TABLE products_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    subcategory_id INT NOT NULL,
    collection_id INT NOT NULL,
    product_code VARCHAR(255) NOT NULL, -- Unique product identifier
    sku VARCHAR(255) NOT NULL UNIQUE, -- Unique SKU for each product variation
    name TEXT NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    description LONGTEXT NOT NULL,
    customizable BOOLEAN NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (subcategory_id) REFERENCES subcategory(id) ON DELETE CASCADE,
    FOREIGN KEY (collection_id) REFERENCES collections_table(id) ON DELETE CASCADE
);

-- creating the product_moq table
CREATE TABLE product_moq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    min_qty INT NOT NULL,  -- MOQ (e.g., 4 pieces, 11 pieces, etc.)
    ppu DECIMAL(10,2) NOT NULL, -- Price per unit at this MOQ
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);

-- Creating product variation table
CREATE TABLE variations_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL, -- Links to the main product
    sku VARCHAR(255) NOT NULL UNIQUE, -- Unique SKU for each variation
    price DECIMAL(10,2) NOT NULL, -- price for security
    stock INT NOT NULL DEFAULT 0, -- Inventory count
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);

-- creating the variation_attributes table
CREATE TABLE variation_attributes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    variation_id INT NOT NULL,
    name VARCHAR(255) NOT NULL, -- e.g., "Color", "Size"
    value VARCHAR(255) NOT NULL, -- e.g., "Red", "M"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE
);

-- creating the product_specifications table
CREATE TABLE product_specifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);

-- creating the media_table table
CREATE TABLE media_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL, -- Links to the main product
    variation_id INT DEFAULT NULL, -- Can be NULL if media is for the general product
    url TEXT NOT NULL,
    type ENUM('image', 'video') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE
);

CREATE TABLE store_interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    action ENUM('like', 'follow') NOT NULL, -- Specifies the interaction type
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, store_id, action), -- Prevent duplicate likes/follows by the same user
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE
);

-- creating the capabilities_table table
CREATE TABLE capabilities_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,  -- Faster and indexed
    description TEXT DEFAULT NULL,  -- Allows null if no description is needed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- creating the default_filters table
CREATE TABLE filters_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,  -- Faster and indexed
    description TEXT DEFAULT NULL,  -- Allows null if no description is needed
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- creating the product_filters table
CREATE TABLE product_filters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    filter_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (filter_id) REFERENCES filters_table(id) ON DELETE CASCADE,
    UNIQUE(product_id, filter_id) -- Ensures no duplicate assignments
);

-- creating the store_capabilities table
CREATE TABLE store_capabilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    capability_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (capability_id) REFERENCES capabilities_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    UNIQUE (store_id, capability_id)  -- Prevent duplicate abilities for the same store
);

-- creating the product review/feedback table
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL, 
    user_id INT NOT NULL,
    rating DECIMAL(2,1) NOT NULL CHECK (rating BETWEEN 1.0 AND 5.0), -- Rating from 1.0 to 5.0
    review_text TEXT NULL, -- Allow users to leave only a rating
    status BOOLEAN DEFAULT 1, -- 1 = Visible, 0 = Hidden
    user_ip VARCHAR(45) NULL, -- Track IP for spam detection
    modified_by_admin BOOLEAN DEFAULT 0, -- Track admin edits
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);

-- creating the store review/feedback table
CREATE TABLE store_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL, 
    user_id INT NOT NULL,
    product_quality DECIMAL(2,1) NOT NULL CHECK (product_quality BETWEEN 1.0 AND 5.0),
    supplier_service DECIMAL(2,1) NOT NULL CHECK (supplier_service BETWEEN 1.0 AND 5.0),
    on_time_shipment DECIMAL(2,1) NOT NULL CHECK (on_time_shipment BETWEEN 1.0 AND 5.0),
    review_text TEXT NULL, -- Optional review text
    status BOOLEAN DEFAULT 1, -- 1 = Visible, 0 = Hidden
    user_ip VARCHAR(45) NULL, -- Helps track abuse/spam
    modified_by_admin BOOLEAN DEFAULT 0, -- Track admin modifications
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(store_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE
);

----------------------------------------------------------------------------------------------------


-- creating the maincategory table
CREATE TABLE maincategory  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    _name LONGTEXT NOT NULL,
    _image LONGTEXT NOT NULL,
    _status LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating the category table
CREATE TABLE category  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    _maincategory INT NOT NULL,
    _name LONGTEXT NOT NULL,
    _image LONGTEXT NOT NULL,
    _status LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (_maincategory) REFERENCES maincategory(id)
);

-- creating the subcategory table
CREATE TABLE subcategory  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    _category INT NOT NULL,
    _name LONGTEXT NOT NULL,
    _image LONGTEXT NOT NULL,
    _status LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (_category) REFERENCES category(id)
);

-- Creating the cart table
CREATE TABLE carts_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE
);


-- Creating the cart_items table
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    sku VARCHAR(255),
    color VARCHAR(100),
    size VARCHAR(50),
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2),
    FOREIGN KEY (cart_id) REFERENCES carts_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);
-- Creating the shipping_methods table
CREATE TABLE shipping_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    status BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the shipping_providers table
CREATE TABLE shipping_providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    duration_from INT NOT NULL,
    duration_to INT NOT NULL,
    class INT NOT NULL,
    offered_by VARCHAR(255) NOT NULL,
    notice VARCHAR(255) NOT NULL,
    is_guaranteed BOOLEAN DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    status BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (method_id) REFERENCES shipping_methods(id) ON DELETE CASCADE
);

-- Creating the Orders_table
CREATE TABLE orders_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_method_id INT NOT NULL,  -- Links to shipping_methods table
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shipping_method_id) REFERENCES shipping_methods(id) ON DELETE CASCADE
);

-- Creating the sheared_cart table
CREATE TABLE shared_carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    shared_by INT NOT NULL,  -- The user who shares the cart
    shared_with INT NOT NULL,  -- The user who receives the shared cart
    status TINYINT DEFAULT 0,  -- 0 = pending, 1 = accepted, -1 = rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart_table(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_by) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with) REFERENCES users_table(id) ON DELETE CASCADE
);