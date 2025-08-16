import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Wrench } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceSelectorProps {
  services: Service[];
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
  serviceType: 'shop' | 'mobile';
  onServiceTypeChange: (type: 'shop' | 'mobile') => void;
  isLoading: boolean;
}

export function ServiceSelector({
  services,
  selectedServices,
  onServicesChange,
  serviceType,
  onServiceTypeChange,
  isLoading
}: ServiceSelectorProps) {
  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    if (checked) {
      onServicesChange([...selectedServices, serviceId]);
    } else {
      onServicesChange(selectedServices.filter(id => id !== serviceId));
    }
  };

  const filteredServices = services.filter(service => 
    serviceType === 'shop' || service.availableForMobile
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) return `${remainingMinutes}min`;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h4 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-service-options">
        Service Options
      </h4>
      
      {/* Service Type Selection */}
      <RadioGroup 
        value={serviceType} 
        onValueChange={(value: 'shop' | 'mobile') => onServiceTypeChange(value)}
        className="space-y-4 mb-6"
      >
        <div className="flex items-center space-x-3 p-4 border-2 border-automotive-blue rounded-lg bg-blue-50">
          <RadioGroupItem value="shop" id="shop" data-testid="radio-service-shop" />
          <Label htmlFor="shop" className="flex-1 cursor-pointer">
            <div className="flex items-center">
              <Wrench className="w-5 h-5 text-automotive-blue mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Shop Service</div>
                <div className="text-sm text-gray-600">Bring your vehicle to our facility</div>
                <div className="text-xs text-gray-500 mt-1">4843 S Telegraph Rd, Dearborn Heights</div>
              </div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-automotive-blue transition-colors">
          <RadioGroupItem value="mobile" id="mobile" data-testid="radio-service-mobile" />
          <Label htmlFor="mobile" className="flex-1 cursor-pointer">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-automotive-blue mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Mobile Service</div>
                <div className="text-sm text-gray-600">We come to your location</div>
                <div className="text-xs text-gray-500 mt-1">Available in Dearborn Heights area</div>
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>

      {/* Service Selection */}
      <h5 className="font-semibold text-gray-900 mb-4">Select Services</h5>
      <div className="space-y-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-3">
              <Skeleton className="h-4 w-4" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : (
          filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
            >
              <Checkbox
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onCheckedChange={(checked) => 
                  handleServiceToggle(service.id, checked === true)
                }
                data-testid={`checkbox-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <Label 
                htmlFor={service.id} 
                className="ml-3 flex-1 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-gray-700 font-medium">{service.name}</div>
                    {service.description && (
                      <div className="text-sm text-gray-500 mt-1">{service.description}</div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    {formatDuration(service.duration)}
                  </div>
                </div>
              </Label>
            </div>
          ))
        )}
        
        {!isLoading && filteredServices.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-4">
            No services available for the selected service type.
          </div>
        )}
      </div>
    </div>
  );
}
