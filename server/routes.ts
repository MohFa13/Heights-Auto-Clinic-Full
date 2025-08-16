import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCustomerSchema, insertVehicleSchema, insertAppointmentSchema, 
  insertAppointmentServiceSchema 
} from "@shared/schema";
import { z } from "zod";

// Seed data for services
const defaultServices = [
  {
    name: "Mobile Auto Repair Services",
    description: "Complete mobile repair services at your location",
    duration: 180, // 3 hours
    basePrice: "150.00",
    availableForMobile: true,
    isActive: true,
  },
  {
    name: "Brake Services and Repairs",
    description: "Complete brake system diagnostics, repairs, and replacements",
    duration: 120, // 2 hours
    basePrice: "200.00",
    availableForMobile: true,
    isActive: true,
  },
  {
    name: "Wheel Alignment Services",
    description: "Precision wheel alignment for optimal vehicle handling",
    duration: 60, // 1 hour
    basePrice: "80.00",
    availableForMobile: false,
    isActive: true,
  },
  {
    name: "Engine Repair and Diagnostics",
    description: "Advanced engine diagnostics and repair services",
    duration: 240, // 4 hours
    basePrice: "300.00",
    availableForMobile: true,
    isActive: true,
  },
  {
    name: "General Automotive Repair",
    description: "Comprehensive automotive maintenance and repair",
    duration: 120, // 2 hours
    basePrice: "100.00",
    availableForMobile: true,
    isActive: true,
  },
  {
    name: "Custom Auto Work",
    description: "Specialized custom automotive work and modifications",
    duration: 300, // 5 hours
    basePrice: "400.00",
    availableForMobile: false,
    isActive: true,
  },
];

const bookingSchema = z.object({
  customer: insertCustomerSchema,
  vehicle: insertVehicleSchema,
  appointment: insertAppointmentSchema.extend({
    serviceIds: z.array(z.string()),
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed services on startup
  try {
    const existingServices = await storage.getServices();
    if (existingServices.length === 0) {
      for (const service of defaultServices) {
        await storage.createService(service);
      }
      console.log("Seeded default services");
    }
  } catch (error) {
    console.error("Failed to seed services:", error);
  }

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getActiveServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get service by ID
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Create appointment
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = bookingSchema.parse(req.body);
      const { customer, vehicle, appointment } = validatedData;

      // Check if customer exists by phone
      let existingCustomer = await storage.getCustomerByPhone(customer.phone);
      
      if (!existingCustomer) {
        existingCustomer = await storage.createCustomer(customer);
      }

      // Create vehicle
      const newVehicle = await storage.createVehicle({
        ...vehicle,
        customerId: existingCustomer.id,
      });

      // Check availability
      const isAvailable = await storage.checkAppointmentAvailability(
        new Date(appointment.appointmentDate),
        appointment.duration
      );

      if (!isAvailable) {
        return res.status(409).json({ 
          message: "Selected time slot is not available" 
        });
      }

      // Create appointment
      const newAppointment = await storage.createAppointment({
        customerId: existingCustomer.id,
        vehicleId: newVehicle.id,
        serviceType: appointment.serviceType,
        appointmentDate: new Date(appointment.appointmentDate),
        duration: appointment.duration,
        serviceLocation: appointment.serviceLocation,
        notes: appointment.notes,
        status: 'pending',
      });

      // Add services to appointment
      for (const serviceId of appointment.serviceIds) {
        await storage.addServiceToAppointment({
          appointmentId: newAppointment.id,
          serviceId,
        });
      }

      // Fetch complete appointment details
      const completeAppointment = await storage.getAppointment(newAppointment.id);
      
      res.status(201).json(completeAppointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  // Get appointment by ID
  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.getAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      res.status(500).json({ message: "Failed to fetch appointment" });
    }
  });

  // Get appointments by date
  app.get("/api/appointments/date/:date", async (req, res) => {
    try {
      const date = new Date(req.params.date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      
      const appointments = await storage.getAppointmentsByDate(date);
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments by date:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  // Update appointment status
  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
      
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const updatedAppointment = await storage.updateAppointmentStatus(req.params.id, status);
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res.json(updatedAppointment);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      res.status(500).json({ message: "Failed to update appointment status" });
    }
  });

  // Check availability for a specific date/time
  app.post("/api/appointments/check-availability", async (req, res) => {
    try {
      const { date, duration } = req.body;
      
      if (!date || !duration) {
        return res.status(400).json({ message: "Date and duration are required" });
      }

      const appointmentDate = new Date(date);
      if (isNaN(appointmentDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      const isAvailable = await storage.checkAppointmentAvailability(appointmentDate, duration);
      res.json({ available: isAvailable });
    } catch (error) {
      console.error("Error checking availability:", error);
      res.status(500).json({ message: "Failed to check availability" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
