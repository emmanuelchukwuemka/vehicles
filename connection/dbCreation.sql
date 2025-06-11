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
    subcategory_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (subcategory_id) REFERENCES subcategory(id) ON DELETE CASCADE
);

-- creating the products table
CREATE TABLE products_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    subcategory_id INT NOT NULL,
    collection_id INT NOT NULL,
    product_code VARCHAR(255) NOT NULL, -- Unique product identifier
    name TEXT NOT NULL,
    description LONGTEXT NOT NULL,
    customizable BOOLEAN NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    weight DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (subcategory_id) REFERENCES subcategory(id) ON DELETE CASCADE,
    FOREIGN KEY (collection_id) REFERENCES collections_table(id) ON DELETE CASCADE
);

-- Product Sample table
CREATE TABLE product_sample (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    ppu DECIMAL(10,2) NOT NULL,
    min_qty INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign keys with cascading delete
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,

    -- One sample per product
    UNIQUE (product_id)
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
    weight DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);

-- creating the variation_attributes table
CREATE TABLE variation_attributes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    variation_id INT NOT NULL,
    attribute_id INT NOT NULL,
    label VARCHAR(255) NOT NULL, -- e.g., "Color", "Size"
    value VARCHAR(255) NOT NULL, -- e.g., "Red", "M"
    price DECIMAL(10,2) NOT NULL, -- price for an attr
    stock INT NULL, -- total in stock
    image VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attributes_table(id) ON DELETE CASCADE
);

-- creating the layout_table table
CREATE TABLE layouts_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    priority VARCHAR(10) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating the attributes_table table
CREATE TABLE attributes_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  layout_id INT NOT NULL, -- how this attribute is displayed (inline, vertical, etc.)
  name VARCHAR(100) NOT NULL,
  label VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (layout_id) REFERENCES layouts_table(id) ON DELETE SET NULL
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
    variation_id INT DEFAULT NULL, 
    attribute_id INT DEFAULT NULL,
    url TEXT NOT NULL,
    type ENUM('image', 'video') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES variation_attributes(id) ON DELETE CASCADE
);

-- creating the store_gallery table
CREATE TABLE store_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    url TEXT NOT NULL,
    type ENUM('image', 'video') NOT NULL,
    position VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE
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

CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);

--/////////////////////////////////////////////////////////////////


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
-- ///////////////////////////////////////////////////////////////////////

-- creating the payment_gateways table
CREATE TABLE payment_gateways (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,              -- e.g., "Paystack", "Flutterwave", "Buypower", "Stripe"
    logo VARCHAR(200) UNIQUE NOT NULL,  
    provider VARCHAR(100) UNIQUE NOT NULL,   -- e.g., "paystack", "flutterwave", "buypower"
    is_active BOOLEAN DEFAULT TRUE,          -- Whether this gateway is available for checkout
    sandbox_mode BOOLEAN DEFAULT FALSE,      -- Indicates if gateway is running in test mode
    config JSON DEFAULT NULL,                 -- Optional config like public keys, secrets, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- creating the user_addresses table
CREATE TABLE user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    label VARCHAR(100) NOT NULL, -- e.g., "Home", "Work"
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_default TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE
);

-- creating the user_payment_methods table
CREATE TABLE user_payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    method VARCHAR(50),      -- e.g., 'card', 'bank'
    gateway_id INT NOT NULL,       
    brand VARCHAR(50) NOT NULL,             -- e.g., mastercard or visa 
    last4 VARCHAR(4) NOT NULL,
    exp_month VARCHAR(10) NOT NULL,
    exp_year VARCHAR(10) NOT NULL,
    token VARCHAR(255) NOT NULL,       -- e.g., paypal, Stripe or Paystack token/id
    is_default TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (gateway_id) REFERENCES payment_gateways(id) ON DELETE CASCADE
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
    store_id INT NOT NULL,
    sku VARCHAR(255),
    color VARCHAR(100),
    size VARCHAR(50),
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2),
    weight DECIMAL(10,2), -- Added weight column
    FOREIGN KEY (cart_id) REFERENCES carts_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE
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

CREATE TABLE live_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT, 
    stream_url TEXT,          -- RTMP stream or playback URL
    recorded_video_url TEXT,  -- Archived video file URL after live ends
    is_live BOOLEAN DEFAULT TRUE,   -- true while live, false when ended
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME DEFAULT NULL,
    viewers_count INT DEFAULT 0,    -- optional analytics
    likes_count INT DEFAULT 0,      -- optional engagement
    thumbnail_url TEXT,             -- optional: preview image
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE
);

-- Creating the Orders_table
CREATE TABLE IF NOT EXISTS orders_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    -- payment_method_id INT NULL,
    logistic_id INT NOT NULL,
    delivery_address INT NOT NULL,
    order_status ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded') NOT NULL DEFAULT 'pending',
    order_ref VARCHAR(100) NOT NULL UNIQUE,
    tracking_id VARCHAR(100) NOT NULL UNIQUE,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    delivery_status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    --FOREIGN KEY (payment_method_id) REFERENCES user_payment_methods(id) ON DELETE SET NULL,
    FOREIGN KEY (logistic_id) REFERENCES shipping_providers(id) ON DELETE CASCADE,
    FOREIGN KEY (delivery_address) REFERENCES user_addresses(id) ON DELETE CASCADE
);

-- Creating order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    variation_id INT NOT NULL,
    sku VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(50),
    quantity INT NOT NULL,
    is_sample TINYINT DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE
);

-- Creating order_item_attributes table
CREATE TABLE IF NOT EXISTS order_item_attributes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_item_id INT NOT NULL,
  attribute_name VARCHAR(100) NOT NULL,
  attribute_value VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE
);

-- Creating the oder_items table
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    variation_id INT NOT NULL,
    sku VARCHAR(100),
    attribute_key TEXT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    weight DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE
);

CREATE TABLE cart_item_attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_item_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_item_id) REFERENCES cart_items(id) ON DELETE CASCADE
);

CREATE TABLE attachment_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attachment VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inquiry_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    attachment_id INT NULL,
    message Text NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (attachment_id) REFERENCES attachment_table(id) ON DELETE CASCADE
);

-- chat_table table
CREATE TABLE chat_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  sender_id INT NOT NULL,
  sender_type ENUM('user', 'store') NOT NULL,
  
  receiver_id INT NOT NULL,
  receiver_type ENUM('user', 'store') NOT NULL,
  
  attachment_id INT NULL,
  message TEXT,
  
  is_product TINYINT(1) NOT NULL DEFAULT 0,
  status TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (attachment_id) REFERENCES attachment_table(id) ON DELETE CASCADE
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

-- Customization table
CREATE TABLE IF NOT EXISTS customizations_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  store_id INT NOT NULL,
  user_id INT NOT NULL,
  variation_id INT NOT NULL,
  sku VARCHAR(255) NOT NULL,
  attr_key VARCHAR(255) NOT NULL,
  customization_type ENUM('text', 'logo', 'image') NOT NULL,
  source ENUM('order', 'cart') NOT NULL,
  customization_id INT DEFAULT NULL,
  value TEXT NOT NULL,
  settings JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY unique_customization (product_id, attr_key, customization_type, source),

  FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
  FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;