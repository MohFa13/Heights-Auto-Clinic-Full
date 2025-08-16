import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/calendar";
import { ServiceSelector } from "@/components/service-selector";
import { AppointmentForm } from "@/components/appointment-form";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

export default function Booking() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceType, setServiceType] = useState<'shop' | 'mobile'>('shop');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const availableTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const saturdayTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'
  ];

  const getAvailableSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return []; // Sunday - closed
    if (dayOfWeek === 6) return saturdayTimeSlots; // Saturday
    return availableTimeSlots; // Monday-Friday
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center">
                <Wrench className="w-6 h-6 text-automotive-blue mr-3" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Book Appointment</h1>
                  <p className="text-xs text-gray-600">Dearborn Heights Auto Clinic</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="tel:3132925120" 
                className="flex items-center text-automotive-blue hover:text-accent transition-colors"
                data-testid="link-phone-booking"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-medium">(313) 292-5120</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Booking Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule Your Appointment</h2>
          <p className="text-lg text-gray-600">Choose between shop service or mobile repair at your location</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-1">
            <ServiceSelector
              services={services}
              selectedServices={selectedServices}
              onServicesChange={setSelectedServices}
              serviceType={serviceType}
              onServiceTypeChange={setServiceType}
              isLoading={servicesLoading}
            />
          </div>

          {/* Calendar */}
          <div className="lg:col-span-1">
            <Calendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              availableSlots={selectedDate ? getAvailableSlots(selectedDate) : []}
            />
          </div>

          {/* Customer Form */}
          <div className="lg:col-span-1">
            <AppointmentForm
              selectedServices={selectedServices}
              serviceType={serviceType}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              services={services}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
