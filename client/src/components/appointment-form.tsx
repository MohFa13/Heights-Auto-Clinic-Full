import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, MapPin, User, Car } from "lucide-react";
import type { Service } from "@shared/schema";

interface AppointmentFormProps {
  selectedServices: string[];
  serviceType: 'shop' | 'mobile';
  selectedDate?: Date;
  selectedTime: string;
  services: Service[];
}

const formSchema = z.object({
  // Customer information
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  customerEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  
  // Vehicle information
  vehicleYear: z.string().min(4, "Please enter the vehicle year"),
  vehicleMake: z.string().min(1, "Please enter the vehicle make"),
  vehicleModel: z.string().min(1, "Please enter the vehicle model"),
  vehicleLicensePlate: z.string().optional(),
  
  // Service location (for mobile)
  serviceAddress: z.string().optional(),
  
  // Additional notes
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AppointmentForm({
  selectedServices,
  serviceType,
  selectedDate,
  selectedTime,
  services
}: AppointmentFormProps) {
  const [showMobileLocation, setShowMobileLocation] = useState(serviceType === 'mobile');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      vehicleYear: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleLicensePlate: "",
      serviceAddress: "",
      notes: "",
    },
  });

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/appointments', data);
      return response.json();
    },
    onSuccess: (appointment) => {
      toast({
        title: "Appointment Scheduled!",
        description: `Your appointment has been scheduled for ${selectedDate?.toLocaleDateString()} at ${selectedTime}`,
      });
      
      // Reset form
      form.reset();
      
      // Invalidate appointments cache
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to schedule appointment",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your appointment",
        variant: "destructive",
      });
      return;
    }

    if (selectedServices.length === 0) {
      toast({
        title: "Missing Information", 
        description: "Please select at least one service",
        variant: "destructive",
      });
      return;
    }

    if (serviceType === 'mobile' && !data.serviceAddress?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a service address for mobile appointments",
        variant: "destructive",
      });
      return;
    }

    // Calculate total duration
    const selectedServiceObjects = services.filter(s => selectedServices.includes(s.id));
    const totalDuration = selectedServiceObjects.reduce((sum, service) => sum + service.duration, 0);

    // Create appointment date/time
    const appointmentDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':').map(Number);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const appointmentData = {
      customer: {
        name: data.customerName,
        phone: data.customerPhone,
        email: data.customerEmail || undefined,
        address: serviceType === 'mobile' ? data.serviceAddress : undefined,
      },
      vehicle: {
        year: data.vehicleYear,
        make: data.vehicleMake,
        model: data.vehicleModel,
        licensePlate: data.vehicleLicensePlate || undefined,
      },
      appointment: {
        serviceType,
        appointmentDate: appointmentDateTime.toISOString(),
        duration: totalDuration,
        serviceLocation: serviceType === 'mobile' ? data.serviceAddress : undefined,
        notes: data.notes || undefined,
        serviceIds: selectedServices,
      },
    };

    createAppointmentMutation.mutate(appointmentData);
  };

  // Update mobile location visibility when service type changes
  if (showMobileLocation !== (serviceType === 'mobile')) {
    setShowMobileLocation(serviceType === 'mobile');
  }

  const selectedServiceNames = services
    .filter(s => selectedServices.includes(s.id))
    .map(s => s.name);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center" data-testid="text-customer-details">
        <svg className="w-6 h-6 mr-2 text-automotive-blue" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
        </svg>
        Customer & Vehicle Details
      </h4>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Customer Information */}
          <div className="space-y-4">
            <div className="flex items-center text-sm font-semibold text-gray-800 mb-3 bg-blue-50 p-3 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              Customer Information
            </div>
            
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Smith" 
                      {...field} 
                      data-testid="input-customer-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(313) 555-0123" 
                      {...field} 
                      data-testid="input-customer-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      {...field} 
                      data-testid="input-customer-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Vehicle Information */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center text-sm font-semibold text-gray-800 mb-3 bg-green-50 p-3 rounded-lg">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Car className="w-4 h-4 text-green-600" />
              </div>
              Vehicle Information
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="vehicleYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="2020" 
                        {...field} 
                        data-testid="input-vehicle-year"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vehicleMake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Honda" 
                        {...field} 
                        data-testid="input-vehicle-make"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="vehicleModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Civic" 
                      {...field} 
                      data-testid="input-vehicle-model"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleLicensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ABC1234" 
                      {...field} 
                      data-testid="input-vehicle-license"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Mobile Service Location */}
          {showMobileLocation && (
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center text-sm font-semibold text-gray-800 mb-3 bg-orange-50 p-3 rounded-lg">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <MapPin className="w-4 h-4 text-orange-600" />
                </div>
                Service Location
              </div>
              
              <FormField
                control={form.control}
                name="serviceAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main St, Dearborn Heights, MI" 
                        {...field} 
                        data-testid="input-service-address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-blue-600 flex items-center bg-blue-50 p-3 rounded-lg">
                <Shield className="w-4 h-4 mr-2" />
                <span className="font-medium">Mobile service available within 15 miles of our shop</span>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          <div className="border-t pt-4">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe any symptoms or specific concerns..." 
                      rows={3} 
                      {...field} 
                      data-testid="textarea-notes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Appointment Summary */}
          {(selectedDate || selectedTime || selectedServices.length > 0) && (
            <div className="border-t pt-6">
              <h6 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                </svg>
                Appointment Summary
              </h6>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg text-sm space-y-3 border border-blue-100">
                {selectedDate && selectedTime && (
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString()} at {selectedTime}
                    </span>
                  </div>
                )}
                {selectedServices.length > 0 && (
                  <div>
                    <span>Services:</span>
                    <ul className="mt-1 space-y-1">
                      {selectedServiceNames.map((name, index) => (
                        <li key={index} className="text-gray-600 ml-4">• {name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Service Type:</span>
                  <span className="font-medium capitalize">{serviceType}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-automotive-blue to-blue-600 text-white py-4 text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={createAppointmentMutation.isPending}
              data-testid="button-schedule-appointment"
            >
              {createAppointmentMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scheduling Your Appointment...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  Schedule My Appointment
                </div>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600 flex items-center justify-center bg-gray-50 p-3 rounded-lg">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              <span className="font-medium">Your information is secure and protected with SSL encryption</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
