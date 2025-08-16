import { checkAppointmentAvailability } from '../../lib/supabase.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { date, duration } = req.body;
      
      if (!date || !duration) {
        return res.status(400).json({ message: 'Date and duration are required' });
      }

      const appointmentDate = new Date(date);
      if (isNaN(appointmentDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }

      const isAvailable = await checkAppointmentAvailability(appointmentDate, duration);
      return res.json({ available: isAvailable });
    } catch (error) {
      console.error('Error checking availability:', error);
      return res.status(500).json({ message: 'Failed to check availability' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
