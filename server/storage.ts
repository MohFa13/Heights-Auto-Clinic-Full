import { 
  users, customers, vehicles, services, appointments, appointmentServices,
  type User, type InsertUser, type Customer, type InsertCustomer, 
  type Vehicle, type InsertVehicle, type Service, type InsertService,
  type Appointment, type InsertAppointment, type AppointmentService, 
  type InsertAppointmentService, type AppointmentWithDetails
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Customer methods
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomer(id: string): Promise<Customer | undefined>;
  getCustomerByPhone(phone: string): Promise<Customer | undefined>;

  // Vehicle methods
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  getVehiclesByCustomer(customerId: string): Promise<Vehicle[]>;

  // Service methods
  getServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointment(id: string): Promise<AppointmentWithDetails | undefined>;
  getAppointmentsByDate(date: Date): Promise<AppointmentWithDetails[]>;
  getAppointmentsByCustomer(customerId: string): Promise<AppointmentWithDetails[]>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
  checkAppointmentAvailability(date: Date, duration: number): Promise<boolean>;

  // Appointment Service methods
  addServiceToAppointment(appointmentService: InsertAppointmentService): Promise<AppointmentService>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const [newCustomer] = await db
      .insert(customers)
      .values(customer)
      .returning();
    return newCustomer;
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer || undefined;
  }

  async getCustomerByPhone(phone: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.phone, phone));
    return customer || undefined;
  }

  async createVehicle(vehicle: InsertVehicle): Promise<Vehicle> {
    const [newVehicle] = await db
      .insert(vehicles)
      .values(vehicle)
      .returning();
    return newVehicle;
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    return vehicle || undefined;
  }

  async getVehiclesByCustomer(customerId: string): Promise<Vehicle[]> {
    return await db.select().from(vehicles).where(eq(vehicles.customerId, customerId));
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getActiveServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true));
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db
      .insert(services)
      .values(service)
      .returning();
    return newService;
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db
      .insert(appointments)
      .values(appointment)
      .returning();
    return newAppointment;
  }

  async getAppointment(id: string): Promise<AppointmentWithDetails | undefined> {
    const result = await db
      .select({
        appointment: appointments,
        customer: customers,
        vehicle: vehicles,
      })
      .from(appointments)
      .leftJoin(customers, eq(appointments.customerId, customers.id))
      .leftJoin(vehicles, eq(appointments.vehicleId, vehicles.id))
      .where(eq(appointments.id, id));

    if (result.length === 0) return undefined;

    const appointmentData = result[0];
    
    // Get appointment services
    const appointmentServicesData = await db
      .select({
        appointmentService: appointmentServices,
        service: services,
      })
      .from(appointmentServices)
      .leftJoin(services, eq(appointmentServices.serviceId, services.id))
      .where(eq(appointmentServices.appointmentId, id));

    return {
      ...appointmentData.appointment,
      customer: appointmentData.customer!,
      vehicle: appointmentData.vehicle!,
      appointmentServices: appointmentServicesData.map(as => ({
        ...as.appointmentService,
        service: as.service!,
      })),
    };
  }

  async getAppointmentsByDate(date: Date): Promise<AppointmentWithDetails[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const result = await db
      .select({
        appointment: appointments,
        customer: customers,
        vehicle: vehicles,
      })
      .from(appointments)
      .leftJoin(customers, eq(appointments.customerId, customers.id))
      .leftJoin(vehicles, eq(appointments.vehicleId, vehicles.id))
      .where(
        and(
          gte(appointments.appointmentDate, startOfDay),
          lte(appointments.appointmentDate, endOfDay)
        )
      )
      .orderBy(appointments.appointmentDate);

    const appointmentsWithServices = await Promise.all(
      result.map(async (appointmentData) => {
        const appointmentServicesData = await db
          .select({
            appointmentService: appointmentServices,
            service: services,
          })
          .from(appointmentServices)
          .leftJoin(services, eq(appointmentServices.serviceId, services.id))
          .where(eq(appointmentServices.appointmentId, appointmentData.appointment.id));

        return {
          ...appointmentData.appointment,
          customer: appointmentData.customer!,
          vehicle: appointmentData.vehicle!,
          appointmentServices: appointmentServicesData.map(as => ({
            ...as.appointmentService,
            service: as.service!,
          })),
        };
      })
    );

    return appointmentsWithServices;
  }

  async getAppointmentsByCustomer(customerId: string): Promise<AppointmentWithDetails[]> {
    const result = await db
      .select({
        appointment: appointments,
        customer: customers,
        vehicle: vehicles,
      })
      .from(appointments)
      .leftJoin(customers, eq(appointments.customerId, customers.id))
      .leftJoin(vehicles, eq(appointments.vehicleId, vehicles.id))
      .where(eq(appointments.customerId, customerId))
      .orderBy(desc(appointments.appointmentDate));

    const appointmentsWithServices = await Promise.all(
      result.map(async (appointmentData) => {
        const appointmentServicesData = await db
          .select({
            appointmentService: appointmentServices,
            service: services,
          })
          .from(appointmentServices)
          .leftJoin(services, eq(appointmentServices.serviceId, services.id))
          .where(eq(appointmentServices.appointmentId, appointmentData.appointment.id));

        return {
          ...appointmentData.appointment,
          customer: appointmentData.customer!,
          vehicle: appointmentData.vehicle!,
          appointmentServices: appointmentServicesData.map(as => ({
            ...as.appointmentService,
            service: as.service!,
          })),
        };
      })
    );

    return appointmentsWithServices;
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    const [updatedAppointment] = await db
      .update(appointments)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(appointments.id, id))
      .returning();
    return updatedAppointment || undefined;
  }

  async checkAppointmentAvailability(date: Date, duration: number): Promise<boolean> {
    const startTime = new Date(date);
    const endTime = new Date(date.getTime() + duration * 60000);

    const conflictingAppointments = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.status, 'confirmed'),
          // Check for overlapping appointments
          gte(appointments.appointmentDate, new Date(startTime.getTime() - 4 * 60 * 60000)), // 4 hours buffer
          lte(appointments.appointmentDate, endTime)
        )
      );

    return conflictingAppointments.length === 0;
  }

  async addServiceToAppointment(appointmentService: InsertAppointmentService): Promise<AppointmentService> {
    const [newAppointmentService] = await db
      .insert(appointmentServices)
      .values(appointmentService)
      .returning();
    return newAppointmentService;
  }
}

export const storage = new DatabaseStorage();
