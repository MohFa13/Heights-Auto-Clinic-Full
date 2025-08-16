import { supabase } from '../lib/supabase.js';

// Default services data
const defaultServices = [
  {
    name: "Mobile Car Repair",
    description: "Complete mobile car repair services at your location - we come to you!",
    duration: 180,
    base_price: "150.00",
    available_for_mobile: true,
    is_active: true,
  },
  {
    name: "Brake System Repair",
    description: "Complete brake system diagnostics, pad/rotor replacement, and brake fluid service",
    duration: 120,
    base_price: "200.00",
    available_for_mobile: true,
    is_active: true,
  },
  {
    name: "Wheel Alignment",
    description: "Precision 4-wheel alignment to prevent tire wear and improve handling",
    duration: 60,
    base_price: "80.00",
    available_for_mobile: false,
    is_active: true,
  },
  {
    name: "Engine Diagnostics & Repair",
    description: "Advanced computer diagnostics and engine repair for all makes and models",
    duration: 240,
    base_price: "300.00",
    available_for_mobile: true,
    is_active: true,
  },
  {
    name: "Oil Change & Maintenance",
    description: "Full-service oil change, filter replacement, and 21-point inspection",
    duration: 45,
    base_price: "60.00",
    available_for_mobile: true,
    is_active: true,
  },
  {
    name: "AC & Heating Service",
    description: "Air conditioning and heating system repair, recharge, and maintenance",
    duration: 90,
    base_price: "120.00",
    available_for_mobile: true,
    is_active: true,
  },
  {
    name: "Transmission Service",
    description: "Transmission fluid change, filter replacement, and diagnostic services",
    duration: 150,
    base_price: "180.00",
    available_for_mobile: false,
    is_active: true,
  },
  {
    name: "Battery & Electrical",
    description: "Battery testing, replacement, and electrical system diagnostics",
    duration: 60,
    base_price: "90.00",
    available_for_mobile: true,
    is_active: true,
  },
];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Check if services exist, if not seed them
      const { data: existingServices, error: checkError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true);

      if (checkError) {
        console.error('Error checking services:', checkError);
        return res.status(500).json({ message: 'Failed to fetch services' });
      }

      // If no services exist, seed them
      if (existingServices.length === 0) {
        const { error: seedError } = await supabase
          .from('services')
          .insert(defaultServices);

        if (seedError) {
          console.error('Error seeding services:', seedError);
          return res.status(500).json({ message: 'Failed to seed services' });
        }

        // Return the seeded services
        const { data: newServices, error: fetchError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true);

        if (fetchError) {
          return res.status(500).json({ message: 'Failed to fetch seeded services' });
        }

        return res.json(newServices);
      }

      return res.json(existingServices);
    } catch (error) {
      console.error('Error in services API:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
