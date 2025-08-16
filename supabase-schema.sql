-- Supabase Database Schema for Heights Auto Clinic
-- Run this SQL in your Supabase Dashboard > SQL Editor

-- Create custom types (enums)
CREATE TYPE service_type AS ENUM ('shop', 'mobile');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  year TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  license_plate TEXT,
  vin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- in minutes
  base_price DECIMAL(10, 2),
  available_for_mobile BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true
);

-- Create appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
  service_type service_type NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  status appointment_status DEFAULT 'pending',
  service_location TEXT, -- for mobile services
  notes TEXT,
  estimated_price DECIMAL(10, 2),
  actual_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointment_services junction table
CREATE TABLE appointment_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) NOT NULL,
  service_id UUID REFERENCES services(id) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_vehicles_customer_id ON vehicles(customer_id);
CREATE INDEX idx_appointments_customer_id ON appointments(customer_id);
CREATE INDEX idx_appointments_vehicle_id ON appointments(vehicle_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointment_services_appointment_id ON appointment_services(appointment_id);
CREATE INDEX idx_appointment_services_service_id ON appointment_services(service_id);

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_services ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations for services" ON services FOR ALL USING (true);
CREATE POLICY "Allow all operations for customers" ON customers FOR ALL USING (true);
CREATE POLICY "Allow all operations for vehicles" ON vehicles FOR ALL USING (true);
CREATE POLICY "Allow all operations for appointments" ON appointments FOR ALL USING (true);
CREATE POLICY "Allow all operations for appointment_services" ON appointment_services FOR ALL USING (true);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for appointments table
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
