# Hospital-Management-System--App  
CREATE DATABASE healthcare;
CREATE TABLE Staff (
    profile_image VARCHAR(255) DEFAULT 'default.png',
    staff_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender ENUM('Male', 'Female', 'Other'),
    role ENUM('Nurse', 'Receptionist', 'Lab Technician', 'Pharmacist', 'Cleaner', 'Admin', 'Accountant'),
    phone VARCHAR(15),
    email VARCHAR(100),
    department_id INT,
    hire_date DATE,
    salary DECIMAL(10,2),
    shift ENUM('Day', 'Night', 'Rotational'),
    status ENUM('Active', 'On Leave', 'Resigned') DEFAULT 'Active',    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);
CREATE TABLE Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) UNIQUE,
    head_doctor_id INT,
    contact_number VARCHAR(15),
    location VARCHAR(100),
    FOREIGN KEY (head_doctor_id) REFERENCES Doctors(doctor_id)
);
CREATE TABLE Billing (
    billing_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    admission_id INT,
    total_amount DECIMAL(10,2),
    paid_amount DECIMAL(10,2),
    payment_status ENUM('Paid', 'Unpaid', 'Partial'),
    payment_method ENUM('Cash', 'Card', 'Insurance', 'UPI'),
    billing_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    remarks TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
    FOREIGN KEY (admission_id) REFERENCES Admissions(admission_id)
);
CREATE TABLE Admissions (
    admission_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    room_number VARCHAR(10),
    admission_date DATETIME,
    discharge_date DATETIME,
    admitted_by INT, -- staff_id or doctor_id
    reason TEXT,
    condition_on_discharge TEXT,
    status ENUM('Admitted', 'Discharged', 'Transferred', 'Deceased') DEFAULT 'Admitted',
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);
CREATE TABLE Appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    appointment_type ENUM('Consultation', 'Follow-up', 'Emergency'),
    status ENUM('Scheduled', 'Completed', 'Cancelled', 'No-show') DEFAULT 'Scheduled',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id)
);
CREATE TABLE Doctors (
    profile_image VARCHAR(255) DEFAULT 'default.png',
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender ENUM('Male', 'Female', 'Other'),
    phone VARCHAR(15),
    email VARCHAR(100),
    department_id INT,
    specialization VARCHAR(100),
    qualification TEXT,
    years_of_experience INT,
    available_days VARCHAR(100),
    available_time_from TIME,
    available_time_to TIME,
    status ENUM('Active', 'On Leave', 'Retired') DEFAULT 'Active',
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);
CREATE TABLE Patients (
    profile_image VARCHAR(255) DEFAULT 'default.png',
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender ENUM('Male', 'Female', 'Other'),
    date_of_birth DATE,
    blood_group VARCHAR(10),
    phone VARCHAR(15),
    email VARCHAR(100),
    address TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(50),
    registered_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Active', 'Discharged', 'Deceased') DEFAULT 'Active'
 );
