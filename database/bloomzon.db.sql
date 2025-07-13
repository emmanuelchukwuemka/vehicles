-- Create regions table
CREATE TABLE IF NOT EXISTS regions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,  -- e.g. West Africa, North America, Europe
    code VARCHAR(10) NOT NULL UNIQUE,   -- e.g. WA, NA, EU
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    region_id INT NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL UNIQUE,        -- e.g. NG, US, GB
    phone_code VARCHAR(10) NOT NULL,         -- e.g. +234
    currency_code VARCHAR(10) NOT NULL,      -- e.g. NGN, USD
    currency_symbol VARCHAR(10) NOT NULL,    -- e.g. ₦, $
    a DECIMAL(10, 4) NOT NULL, -- For real-time or snapshot rate
    flag_url VARCHAR(500) DEFAULT NULL,      -- Optional: URL to country flag
    status TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create states table
CREATE TABLE IF NOT EXISTS states (
    id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20), -- optional: e.g. CA for California, or LA for Lagos
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
    UNIQUE(country_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the maincategory table
CREATE TABLE IF NOT EXISTS maincategory  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) UNIQUE NOT NULL,
    image TEXT NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    label VARCHAR(250) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the category table
CREATE TABLE IF NOT EXISTS category  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    maincategory_id INT NOT NULL,
    name VARCHAR(250) NOT NULL,
    image TEXT NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    label VARCHAR(250) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maincategory_id) REFERENCES maincategory(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the subcategory table
CREATE TABLE IF NOT EXISTS subcategory  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    name VARCHAR(250) NOT NULL,
    image TEXT NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    label VARCHAR(250) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the layout_table table
CREATE TABLE IF NOT EXISTS layouts_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    priority VARCHAR(10) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the predefined attributes table
CREATE TABLE IF NOT EXISTS attributes_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  layout_id INT NULL, -- how this attribute is displayed (inline, vertical, etc.)
  name VARCHAR(100) NOT NULL,
  label VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (layout_id) REFERENCES layouts_table(id) ON DELETE SET NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create the user table
CREATE TABLE IF NOT EXISTS users_table(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    country_id INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    picture VARCHAR(500) DEFAULT NULL,
    is_verified TINYINT(1) NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id),
    INDEX idx_status_verified (status, is_verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create the users scope table
CREATE TABLE IF NOT EXISTS users_scope (
  user_id INT NOT NULL,
  scope ENUM('buyer', 'seller', 'manufacturer', 'carrier') NOT NULL,
  PRIMARY KEY (user_id, scope),
  FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- create store account
CREATE TABLE IF NOT EXISTS stores_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT NOT NULL,                       -- References the vendor who owns the store
    name VARCHAR(255) NOT NULL,                   -- Store name
    slogan VARCHAR(255),                          -- Optional slogan
    country VARCHAR(100) NOT NULL,                -- Country the store is based in
    banner TEXT,                                  -- Store banner image URL
    picture TEXT,                                 -- Store picture image URL
    net_worth DECIMAL(10,2) NOT NULL,                  -- Financial worth of the store
    logo TEXT,                                    -- Logo URL
    wallet DECIMAL(10,2) NOT NULL,                     -- Wallet details (likely stringified JSON)
    staff_count INT DEFAULT 0,                    -- Number of employees
    address VARCHAR(255) NOT NULL,                -- Store address
    floor_space VARCHAR(50) NOT NULL,             -- Physical space measurement (e.g., "500 sqft")
    code VARCHAR(50) NOT NULL UNIQUE,             -- Unique store identifier/code
    is_verified TINYINT(1) DEFAULT 0,             -- 0 = Not verified, 1 = Verified
    verified_date TIMESTAMP NULL DEFAULT NULL,    -- Timestamp of verification (nullable)
    status TINYINT(1) DEFAULT 1,                  -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (vendor_id) REFERENCES users_table(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the product collections table
CREATE TABLE IF NOT EXISTS collections_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    subcategory_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (subcategory_id) REFERENCES subcategory(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the products table
CREATE TABLE IF NOT EXISTS products_table (
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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Product Sample table
CREATE TABLE IF NOT EXISTS product_sample (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    ppu DECIMAL(10,2) UNIQUE NOT NULL,
    min_qty INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the product_moq table
CREATE TABLE IF NOT EXISTS product_moq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    min_qty INT NOT NULL,  -- MOQ (e.g., 4 pieces, 11 pieces, etc.)
    ppu DECIMAL(10,2) NOT NULL, -- Price per unit at this MOQ
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

-- Creating product variation table
CREATE TABLE IF NOT EXISTS variations_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL, -- Links to the main product
    sku VARCHAR(255) NOT NULL UNIQUE, -- Unique SKU for each variation
    price DECIMAL(10,2) NOT NULL, -- price for security
    stock INT NOT NULL DEFAULT 0, -- Inventory count
    weight DECIMAL(10,2) NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = Active, 0 = Inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the variation_attributes table
CREATE TABLE IF NOT EXISTS variation_attributes (
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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the product_specifications table
CREATE TABLE IF NOT EXISTS product_specifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the media_table table
CREATE TABLE IF NOT EXISTS media_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL, -- Links to the main product
    product_id INT NOT NULL, -- Links to the main product
    variation_id INT DEFAULT NULL, 
    attribute_id INT DEFAULT NULL,
    url TEXT NOT NULL,
    type ENUM('image', 'video') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES variation_attributes(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the store_gallery table
CREATE TABLE IF NOT EXISTS store_gallery (
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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create interation table
CREATE TABLE IF NOT EXISTS interactions (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  target_type ENUM('store', 'product', 'video') NOT NULL,
  target_id INT NOT NULL,
  action ENUM('like', 'follow') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY unique_interaction (user_id, target_type, target_id, action),
  INDEX idx_user_id (user_id),
  INDEX idx_target_type (target_type),
  INDEX idx_target_id (target_id),
  INDEX idx_action (action),

  FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE

) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- creating the capabilities_table table
CREATE TABLE IF NOT EXISTS capabilities_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,  -- Faster and indexed
    description TEXT DEFAULT NULL,  -- Allows null if no description is needed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the default_filters table
CREATE TABLE IF NOT EXISTS filters_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,  -- Faster and indexed
    description TEXT DEFAULT NULL,  -- Allows null if no description is needed
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the product_filters table
CREATE TABLE product_filters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    filter_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (filter_id) REFERENCES filters_table(id) ON DELETE CASCADE,
    UNIQUE(product_id, filter_id) -- Ensures no duplicate assignments

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create whishlist table
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- creating the payment_gateways table
CREATE TABLE payment_gateways (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,              -- e.g., "Paystack", "Flutterwave", "Buypower", "Stripe"
    logo VARCHAR(200) NOT NULL,  
    provider VARCHAR(100) UNIQUE NOT NULL,   -- e.g., "paystack", "flutterwave", "buypower"
    is_active TINYINT(1) DEFAULT 1,          -- Whether this gateway is available for checkout
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creating the cart table
CREATE TABLE IF NOT EXISTS carts_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creating the cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    variation_id INT NOT NULL,
    sku VARCHAR(255),
    attribute_key VARCHAR(250) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2),
    weight DECIMAL(10,2), -- Added weight column

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cart_id) REFERENCES carts_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE,
    FOREIGN KEY (variation_id) REFERENCES variations_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creating the shipping_methods table
CREATE TABLE IF NOT EXISTS shipping_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creating the Orders_table
CREATE TABLE IF NOT EXISTS orders_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
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
    FOREIGN KEY (logistic_id) REFERENCES shipping_providers(id) ON DELETE CASCADE,
    FOREIGN KEY (delivery_address) REFERENCES user_addresses(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creating order_item_attributes table
CREATE TABLE IF NOT EXISTS order_item_attributes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_item_id INT NOT NULL,
  attribute_name VARCHAR(100) NOT NULL,
  attribute_value VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creating the oder_items table
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    variation_id INT NOT NULL,
    sku VARCHAR(255) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cart_item_attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_item_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_item_id) REFERENCES cart_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS attachment_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attachment VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inquiry_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    attachment_id INT NULL,
    message Text NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE,
    FOREIGN KEY (attachment_id) REFERENCES attachment_table(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- chat_table table
CREATE TABLE IF NOT EXISTS chat_table (
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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- store_tips table
CREATE TABLE IF NOT EXISTS store_tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT NOT NULL,
  media_type ENUM('live_clip', 'media_clip') NOT NULL,
  media_url TEXT NOT NULL,           -- stores the video/clip URL
  description TEXT DEFAULT NULL,     -- new column for tip description
  products JSON NOT NULL,            -- array of product IDs, e.g. [1, 2, 3]
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (store_id) REFERENCES stores_table(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;