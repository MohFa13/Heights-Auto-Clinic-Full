import { supabase } from '../../../lib/supabase.js';

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
      const { date } = req.query;
      
      const queryDate = new Date(date);
      if (isNaN(queryDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }

      // Get start and end of day
      const startOfDay = new Date(queryDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(queryDate);
      endOfDay.setHours(23, 59, 59, 999);

      const { data: appointments, error } = await supabase
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
        .gte('appointment_date', startOfDay.toISOString())
        .lte('appointment_date', endOfDay.toISOString())
        .order('appointment_date', { ascending: true });

      if (error) {
        console.error('Error fetching appointments by date:', error);
        return res.status(500).json({ message: 'Failed to fetch appointments' });
      }

      return res.json(appointments);
    } catch (error) {
      console.error('Error in appointments by date API:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
