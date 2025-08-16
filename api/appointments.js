import { supabase, generateId, checkAppointmentAvailability } from '../lib/supabase.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { customer, vehicle, appointment } = req.body;

      if (!customer || !vehicle || !appointment) {
        return res.status(400).json({ message: 'Missing required data' });
      }

      // Check if customer exists by phone
      const { data: existingCustomers } = await supabase
        .from('customers')
        .select('*')
        .eq('phone', customer.phone)
        .limit(1);

      let customerId;
      if (existingCustomers && existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;
      } else {
        // Create new customer
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            id: generateId(),
            name: customer.name,
            phone: customer.phone,
            email: customer.email || null,
            address: customer.address || null,
          })
          .select()
          .single();

        if (customerError) {
          console.error('Error creating customer:', customerError);
          return res.status(500).json({ message: 'Failed to create customer' });
        }
        customerId = newCustomer.id;
      }

      // Create vehicle
      const vehicleId = generateId();
      const { error: vehicleError } = await supabase
        .from('vehicles')
        .insert({
          id: vehicleId,
          customer_id: customerId,
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          license_plate: vehicle.licensePlate || null,
        });

      if (vehicleError) {
        console.error('Error creating vehicle:', vehicleError);
        return res.status(500).json({ message: 'Failed to create vehicle' });
      }

      // Check availability
      const isAvailable = await checkAppointmentAvailability(
        appointment.appointmentDate,
        appointment.duration
      );

      if (!isAvailable) {
        return res.status(409).json({ 
          message: 'Selected time slot is not available' 
        });
      }

      // Create appointment
      const appointmentId = generateId();
      const { data: newAppointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          id: appointmentId,
          customer_id: customerId,
          vehicle_id: vehicleId,
          service_type: appointment.serviceType,
          appointment_date: appointment.appointmentDate,
          duration: appointment.duration,
          service_location: appointment.serviceLocation || null,
          notes: appointment.notes || null,
          status: 'pending',
        })
        .select()
        .single();

      if (appointmentError) {
        console.error('Error creating appointment:', appointmentError);
        return res.status(500).json({ message: 'Failed to create appointment' });
      }

      // Add services to appointment
      if (appointment.serviceIds && appointment.serviceIds.length > 0) {
        const appointmentServices = appointment.serviceIds.map(serviceId => ({
          id: generateId(),
          appointment_id: appointmentId,
          service_id: serviceId,
        }));

        const { error: servicesError } = await supabase
          .from('appointment_services')
          .insert(appointmentServices);

        if (servicesError) {
          console.error('Error adding services to appointment:', servicesError);
          return res.status(500).json({ message: 'Failed to add services to appointment' });
        }
      }

      // Fetch complete appointment details
      const { data: completeAppointment, error: fetchError } = await supabase
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
        .eq('id', appointmentId)
        .single();

      if (fetchError) {
        console.error('Error fetching complete appointment:', fetchError);
        return res.status(500).json({ message: 'Failed to fetch appointment details' });
      }

      return res.status(201).json(completeAppointment);
    } catch (error) {
      console.error('Error in appointments API:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
