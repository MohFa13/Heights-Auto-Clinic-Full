import { supabase } from '../../../lib/supabase.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'PATCH') {
    try {
      const { id } = req.query;
      const { status } = req.body;
      
      const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
      
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const { data: updatedAppointment, error } = await supabase
        .from('appointments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
          *,
          customers(*),
          vehicles(*),
          appointment_services(
            *,
            services(*)
          )
        `)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ message: 'Appointment not found' });
        }
        console.error('Error updating appointment status:', error);
        return res.status(500).json({ message: 'Failed to update appointment status' });
      }

      return res.json(updatedAppointment);
    } catch (error) {
      console.error('Error in appointment status update API:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
