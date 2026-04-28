/*
  # Landing Page Daniela Moya - Initial Schema

  ## New Tables

  ### appointments
  - `id` (uuid, primary key)
  - `name` (text) - Client full name
  - `email` (text) - Client email
  - `phone` (text) - Client phone number
  - `service` (text) - Service selected: 'limpieza', 'maquillaje', 'asesoria'
  - `appointment_date` (date) - Date of the appointment
  - `appointment_time` (text) - Time slot selected
  - `notes` (text, nullable) - Optional notes
  - `status` (text) - 'pending', 'confirmed', 'cancelled'
  - `created_at` (timestamptz)

  ### contacts
  - `id` (uuid, primary key)
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `message` (text) - Message content
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Anyone (anon) can insert appointments and contacts
  - Authenticated users can read all records (for admin)
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  service text NOT NULL DEFAULT 'limpieza',
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  notes text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book an appointment"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);
