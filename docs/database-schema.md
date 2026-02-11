# FarMyKixFixMyCar - Database Schema Design

## Overview
This document defines the complete database schema for the FarMyKixFixMyCar platform. The schema is designed to support a scalable, relational database system that handles vehicle owners, mechanics, service requests, parts inventory, and maintenance history.

---

## Core Tables

### 1. Users Table
Handles both **Vehicle Owners** and **Mechanics** with role-based differentiation.

```sql
CREATE TABLE Users (
  user_id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  role ENUM('owner', 'mechanic') NOT NULL,
  profile_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  INDEX idx_email (email),
  INDEX idx_role (role)
);
```

**Key Fields:**
- `user_id`: Unique identifier (e.g., U001, M001)
- `role`: Distinguishes between 'owner' and 'mechanic'
- `is_verified`: For mechanic verification status

---

### 2. Vehicles Table
Stores vehicle information linked to owners.

```sql
CREATE TABLE Vehicles (
  vehicle_id VARCHAR(50) PRIMARY KEY,
  owner_id VARCHAR(50) NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  vin VARCHAR(17) UNIQUE,
  license_plate VARCHAR(20) NOT NULL,
  current_mileage INT DEFAULT 0,
  last_service_date DATE,
  next_service_due_mileage INT,
  vehicle_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  INDEX idx_owner (owner_id),
  INDEX idx_license_plate (license_plate)
);
```

**Key Fields:**
- `vin`: Vehicle Identification Number (17 characters)
- `current_mileage`: Updated after each service
- `next_service_due_mileage`: For maintenance reminders

---

### 3. Mechanic_Profiles Table
Extended information for users with role='mechanic'.

```sql
CREATE TABLE Mechanic_Profiles (
  mechanic_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  years_of_experience INT NOT NULL,
  specializations TEXT, -- JSON array: ["เครื่องยนต์", "ระบบไฟฟ้า"]
  starting_price DECIMAL(10, 2),
  average_rating DECIMAL(3, 2) DEFAULT 0.00,
  total_reviews INT DEFAULT 0,
  total_jobs_completed INT DEFAULT 0,
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  is_available BOOLEAN DEFAULT TRUE,
  verification_document_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  INDEX idx_available (is_available),
  INDEX idx_rating (average_rating)
);
```

**Key Fields:**
- `specializations`: Stored as JSON for flexibility
- `current_latitude/longitude`: For proximity-based matching
- `is_available`: Real-time availability status

---

### 4. Service_Requests Table
Central table for all service bookings (emergency & scheduled).

```sql
CREATE TABLE Service_Requests (
  job_id VARCHAR(50) PRIMARY KEY,
  vehicle_id VARCHAR(50) NOT NULL,
  owner_id VARCHAR(50) NOT NULL,
  mechanic_id VARCHAR(50),
  service_type ENUM('emergency', 'scheduled') NOT NULL,
  symptom_description TEXT NOT NULL,
  location_address TEXT NOT NULL,
  location_latitude DECIMAL(10, 8),
  location_longitude DECIMAL(11, 8),
  status ENUM('pending', 'matched', 'en_route', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  scheduled_at TIMESTAMP NULL,
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  estimated_cost DECIMAL(10, 2),
  final_cost DECIMAL(10, 2),
  payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
  FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (mechanic_id) REFERENCES Users(user_id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_owner (owner_id),
  INDEX idx_mechanic (mechanic_id),
  INDEX idx_requested_at (requested_at)
);
```

**Key Fields:**
- `status`: Workflow tracking (pending → matched → en_route → in_progress → completed)
- `service_type`: Emergency or scheduled
- `payment_status`: Integration with payment gateway

---

### 5. Service_Request_Images Table
Stores before/during photos uploaded during booking.

```sql
CREATE TABLE Service_Request_Images (
  image_id VARCHAR(50) PRIMARY KEY,
  job_id VARCHAR(50) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  image_type ENUM('problem', 'before', 'after') DEFAULT 'problem',
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES Service_Requests(job_id) ON DELETE CASCADE,
  INDEX idx_job (job_id)
);
```

---

### 6. Maintenance_Logs Table
Historical record of all completed services.

```sql
CREATE TABLE Maintenance_Logs (
  log_id VARCHAR(50) PRIMARY KEY,
  vehicle_id VARCHAR(50) NOT NULL,
  job_id VARCHAR(50),
  mechanic_id VARCHAR(50),
  service_date DATE NOT NULL,
  service_type VARCHAR(255) NOT NULL,
  labor_cost DECIMAL(10, 2) DEFAULT 0.00,
  parts_cost DECIMAL(10, 2) DEFAULT 0.00,
  total_cost DECIMAL(10, 2) NOT NULL,
  mileage_at_service INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES Service_Requests(job_id) ON DELETE SET NULL,
  FOREIGN KEY (mechanic_id) REFERENCES Users(user_id) ON DELETE SET NULL,
  INDEX idx_vehicle (vehicle_id),
  INDEX idx_service_date (service_date)
);
```

**Key Fields:**
- `labor_cost` + `parts_cost` = `total_cost`
- `mileage_at_service`: For tracking maintenance intervals

---

### 7. Maintenance_Log_Parts Table
Bridge table linking parts used in each service.

```sql
CREATE TABLE Maintenance_Log_Parts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  log_id VARCHAR(50) NOT NULL,
  part_sku VARCHAR(50) NOT NULL,
  part_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (log_id) REFERENCES Maintenance_Logs(log_id) ON DELETE CASCADE,
  FOREIGN KEY (part_sku) REFERENCES Parts_Store(sku) ON DELETE RESTRICT,
  INDEX idx_log (log_id)
);
```

---

### 8. Parts_Store Table
Inventory management for e-commerce parts store.

```sql
CREATE TABLE Parts_Store (
  sku VARCHAR(50) PRIMARY KEY,
  part_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  brand VARCHAR(100),
  compatible_models TEXT, -- JSON array: ["Toyota Camry", "Honda Civic"]
  price DECIMAL(10, 2) NOT NULL,
  stock_level INT DEFAULT 0,
  low_stock_threshold INT DEFAULT 10,
  product_image_url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_stock (stock_level),
  FULLTEXT idx_search (part_name, brand, description)
);
```

**Key Fields:**
- `compatible_models`: JSON array for vehicle compatibility filtering
- `low_stock_threshold`: For automatic reorder alerts
- **FULLTEXT index**: For efficient search

---

### 9. Order_Items Table
For parts store purchases.

```sql
CREATE TABLE Order_Items (
  order_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  payment_method VARCHAR(50),
  ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivered_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_status (order_status)
);

CREATE TABLE Order_Items_Details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  part_sku VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Order_Items(order_id) ON DELETE CASCADE,
  FOREIGN KEY (part_sku) REFERENCES Parts_Store(sku) ON DELETE RESTRICT
);
```

---

### 10. Reviews_Ratings Table
For rating mechanics and services.

```sql
CREATE TABLE Reviews_Ratings (
  review_id VARCHAR(50) PRIMARY KEY,
  job_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  mechanic_id VARCHAR(50) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES Service_Requests(job_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (mechanic_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  INDEX idx_mechanic (mechanic_id),
  INDEX idx_rating (rating)
);
```

---

## Relationships Summary

```
Users (1) ----< (*) Vehicles
Users (1:mechanic) ----< (*) Mechanic_Profiles
Users (1:owner) ----< (*) Service_Requests
Users (1:mechanic) ----< (*) Service_Requests (as mechanic)
Vehicles (1) ----< (*) Service_Requests
Service_Requests (1) ----< (*) Service_Request_Images
Service_Requests (1) ---< (0..1) Maintenance_Logs
Vehicles (1) ----< (*) Maintenance_Logs
Maintenance_Logs (1) ----< (*) Maintenance_Log_Parts
Parts_Store (1) ----< (*) Maintenance_Log_Parts
Parts_Store (1) ----< (*) Order_Items_Details
Users (1) ----< (*) Order_Items
Service_Requests (1) ---< (0..1) Reviews_Ratings
```

---

## Data Integrity & Performance

### Indexes
- Primary keys on all ID fields
- Foreign key indexes for faster joins
- Index on frequently queried fields (status, dates, ratings)
- FULLTEXT index on Parts_Store for search

### Constraints
- Foreign keys with appropriate CASCADE/RESTRICT behaviors
- CHECK constraints on ratings (1-5 scale)
- UNIQUE constraints on email, VIN, license_plate

### Triggers (Recommended)
```sql
-- Update Mechanic average rating after new review
DELIMITER $$
CREATE TRIGGER update_mechanic_rating
AFTER INSERT ON Reviews_Ratings
FOR EACH ROW
BEGIN
  UPDATE Mechanic_Profiles
  SET average_rating = (
    SELECT AVG(rating) 
    FROM Reviews_Ratings 
    WHERE mechanic_id = NEW.mechanic_id
  ),
  total_reviews = (
    SELECT COUNT(*) 
    FROM Reviews_Ratings 
    WHERE mechanic_id = NEW.mechanic_id
  )
  WHERE mechanic_id = NEW.mechanic_id;
END$$
DELIMITER ;
```

---

## Sample Queries

### Find available mechanics near user location
```sql
SELECT u.full_name, m.starting_price, m.average_rating,
  (6371 * acos(cos(radians(?)) * cos(radians(m.current_latitude)) 
    * cos(radians(m.current_longitude) - radians(?)) 
    + sin(radians(?)) * sin(radians(m.current_latitude)))) AS distance
FROM Users u
JOIN Mechanic_Profiles m ON u.user_id = m.user_id
WHERE m.is_available = TRUE AND u.role = 'mechanic'
HAVING distance < 20
ORDER BY distance ASC;
```

### Get vehicle maintenance history with costs
```sql
SELECT ml.service_date, ml.service_type, ml.total_cost, ml.mileage_at_service,
  u.full_name AS mechanic_name
FROM Maintenance_Logs ml
JOIN Users u ON ml.mechanic_id = u.user_id
WHERE ml.vehicle_id = ?
ORDER BY ml.service_date DESC;
```

---

**Schema Version:** 1.0  
**Last Updated:** February 10, 2026
