import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
  availableSlots: string[];
}

export function Calendar({ 
  selectedDate, 
  onDateChange, 
  selectedTime, 
  onTimeChange, 
  availableSlots 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dayOfWeek = date.getDay();
    return date < today || dayOfWeek === 0; // Disable past dates and Sundays
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center" data-testid="text-calendar-title">
        <svg className="w-6 h-6 mr-2 text-automotive-blue" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
        </svg>
        Select Date & Time
      </h4>
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold text-gray-900" data-testid="text-current-month">
          {formatDate(currentMonth)}
        </h5>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={previousMonth}
            data-testid="button-previous-month"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={nextMonth}
            data-testid="button-next-month"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        
        {days.map((day) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isSelected = selectedDate && 
            date.toDateString() === selectedDate.toDateString();
          const isDisabled = isDateDisabled(date);
          
          return (
            <button
              key={day}
              className={cn(
                "h-10 text-sm rounded-lg transition-all duration-200 font-medium",
                isSelected && "bg-automotive-blue text-white shadow-md scale-105",
                !isSelected && !isDisabled && "hover:bg-blue-50 hover:text-automotive-blue text-gray-700 hover:scale-105",
                isDisabled && "text-gray-300 cursor-not-allowed bg-gray-50"
              )}
              onClick={() => !isDisabled && onDateChange(date)}
              disabled={isDisabled}
              data-testid={`button-date-${day}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Business Hours */}
      <div className="border-t pt-4">
        <div className="flex items-center mb-3">
          <div className="bg-gray-100 p-2 rounded-lg mr-3">
            <Clock className="w-4 h-4 text-gray-600" />
          </div>
          <h6 className="font-medium text-gray-900">Business Hours</h6>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monday - Friday:</span>
              <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Saturday:</span>
              <span className="font-medium text-gray-900">9:00 AM - 3:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sunday:</span>
              <span className="font-medium text-red-600">Closed</span>
            </div>
          </div>
        </div>
        
        {/* Time Slot Selection */}
        {selectedDate && (
          <div>
            <h6 className="font-medium text-gray-900 mb-3" data-testid="text-available-slots">
              Available Time Slots
            </h6>
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    className={cn(
                      "p-3 text-sm border rounded-lg transition-all duration-200 font-medium",
                      selectedTime === slot
                        ? "bg-automotive-blue text-white border-automotive-blue shadow-md scale-105"
                        : "border-gray-200 hover:border-automotive-blue hover:bg-blue-50 hover:scale-105 text-gray-700"
                    )}
                    onClick={() => onTimeChange(slot)}
                    data-testid={`button-time-${slot}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Info className="w-4 h-4 mr-2" />
                No appointments available on Sundays
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
