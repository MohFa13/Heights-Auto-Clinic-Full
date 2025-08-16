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
      <div className="mb-6">
        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-automotive-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
          </svg>
          Choose Service Location
        </h5>
        <RadioGroup 
          value={serviceType} 
          onValueChange={(value: 'shop' | 'mobile') => onServiceTypeChange(value)}
          className="space-y-3"
        >
          <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
            serviceType === 'shop' 
              ? 'border-automotive-blue bg-blue-50 shadow-md' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
          }`}>
            <RadioGroupItem value="shop" id="shop" data-testid="radio-service-shop" />
            <Label htmlFor="shop" className="flex-1 cursor-pointer">
              <div className="flex items-center">
                <div className="bg-automotive-blue/10 p-2 rounded-lg mr-3">
                  <Wrench className="w-5 h-5 text-automotive-blue" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Shop Service</div>
                  <div className="text-sm text-gray-600">Bring your car to our facility</div>
                  <div className="text-xs text-gray-500 mt-1">📍 4843 S Telegraph Rd, Dearborn Heights</div>
                </div>
              </div>
            </Label>
          </div>

          <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
            serviceType === 'mobile' 
              ? 'border-automotive-blue bg-blue-50 shadow-md' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
          }`}>
            <RadioGroupItem value="mobile" id="mobile" data-testid="radio-service-mobile" />
            <Label htmlFor="mobile" className="flex-1 cursor-pointer">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 flex items-center">
                    Mobile Service
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Popular</span>
                  </div>
                  <div className="text-sm text-gray-600">We come to your location</div>
                  <div className="text-xs text-gray-500 mt-1">🚐 Available throughout Dearborn Heights area</div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Service Selection */}
      <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-automotive-blue" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
        Select Car Services
      </h5>
      <div className="space-y-3">
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
              className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                selectedServices.includes(service.id)
                  ? 'border-automotive-blue bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={service.id}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={(checked) => 
                    handleServiceToggle(service.id, checked === true)
                  }
                  data-testid={`checkbox-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-1"
                />
                <Label 
                  htmlFor={service.id} 
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-gray-900 font-semibold text-lg">{service.name}</div>
                      {service.description && (
                        <div className="text-sm text-gray-600 mt-1 leading-relaxed">{service.description}</div>
                      )}
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          {formatDuration(service.duration)}
                        </div>
                        {service.basePrice && (
                          <div className="flex items-center text-sm text-green-600 font-medium">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                            </svg>
                            Starting at ${service.basePrice}
                          </div>
                        )}
                        {service.availableForMobile && (
                          <div className="flex items-center text-sm text-blue-600">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                            </svg>
                            Mobile available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
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
