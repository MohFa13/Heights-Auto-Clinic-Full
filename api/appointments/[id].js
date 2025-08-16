import { supabase } from '../../lib/supabase.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      const { data: appointment, error } = await supabase
        .from('appointments')
        .select(`
          *,
          customers(*),
          vehicles(*),
          appointment_services(
            *,
            services(*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ message: 'Appointment not found' });
        }
        console.error('Error fetching appointment:', error);
        return res.status(500).json({ message: 'Failed to fetch appointment' });
      }

      return res.json(appointment);
    } catch (error) {
      console.error('Error in appointment API:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
