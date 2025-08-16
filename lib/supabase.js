import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to generate UUID
export function generateId() {
  return crypto.randomUUID();
}

// Helper function to check appointment availability
export async function checkAppointmentAvailability(appointmentDate, duration) {
  try {
    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // Check for overlapping appointments
    const { data: overlappingAppointments, error } = await supabase
      .from('appointments')
      .select('appointment_date, duration')
      .not('status', 'eq', 'cancelled')
      .gte('appointment_date', startTime.toISOString())
      .lt('appointment_date', endTime.toISOString());

    if (error) {
      console.error('Error checking availability:', error);
      return false;
    }

    return overlappingAppointments.length === 0;
  } catch (error) {
    console.error('Error in availability check:', error);
    return false;
  }
}
