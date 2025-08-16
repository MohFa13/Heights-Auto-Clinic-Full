import { Link } from "wouter";
import { Phone, Wrench, MapPin, Clock, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Wrench className="w-8 h-8 text-automotive-blue mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900" data-testid="text-clinic-name">
                    Dearborn Heights Auto Clinic
                  </h1>
                  <p className="text-xs text-gray-600">Serving Michigan Since 1986</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="tel:3132925120" 
                className="flex items-center text-automotive-blue hover:text-accent transition-colors"
                data-testid="link-phone-header"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-medium">(313) 292-5120</span>
              </a>
              <Button className="bg-automotive-blue text-white hover:bg-accent" data-testid="button-emergency-service">
                Emergency Service
              </Button>
            </div>
            <button className="md:hidden text-gray-600" data-testid="button-mobile-menu">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-automotive-blue to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Professional Auto Repair
                <span className="block text-automotive-silver">39+ Years of Excellence</span>
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Mobile auto repair services and complete automotive solutions in Dearborn Heights, Michigan. 
                From brake services to engine repair - we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button 
                    className="bg-white text-automotive-blue px-8 py-3 hover:bg-gray-100"
                    data-testid="button-book-appointment"
                  >
                    Book Appointment
                  </Button>
                </Link>
                <a 
                  href="tel:3132925120" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-automotive-blue transition-colors text-center"
                  data-testid="link-call-now-hero"
                >
                  Call Now: (313) 292-5120
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1632823471565-1ecdf5ac2242?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional automotive repair shop" 
                className="rounded-xl shadow-2xl w-full h-auto"
                data-testid="img-hero-workshop"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-automotive-blue text-sm font-semibold">Established</div>
                <div className="text-2xl font-bold text-gray-900" data-testid="text-established-year">1986</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Professional Services</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete automotive solutions with mobile service options throughout Dearborn Heights and surrounding Michigan areas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-blue-100" data-testid="card-service-mobile">
              <div className="text-automotive-blue text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7c0-1.1-.9-2-2-2h-3V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v1H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2c1.1 0 2-.9 2-2V7zM8 4h4v1H8V4zM8 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Mobile Car Repair</h4>
              <p className="text-gray-600 mb-4">
                We come to you! Professional mobile car repair services at your home, office, or any location in Dearborn Heights.
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                On-site service available
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-red-100" data-testid="card-service-brakes">
              <div className="text-red-600 text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Brake System Repair</h4>
              <p className="text-gray-600 mb-4">
                Complete brake system service including pads, rotors, fluid, and safety inspections for all car makes.
              </p>
              <div className="flex items-center text-red-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                Safety critical service
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-orange-100" data-testid="card-service-engine">
              <div className="text-orange-600 text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Engine Diagnostics & Repair</h4>
              <p className="text-gray-600 mb-4">
                Computer diagnostics, check engine lights, and complete engine repair for all car makes and models.
              </p>
              <div className="flex items-center text-orange-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                Advanced diagnostics
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-purple-100" data-testid="card-service-alignment">
              <div className="text-purple-600 text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">4-Wheel Alignment</h4>
              <p className="text-gray-600 mb-4">
                Precision 4-wheel alignment to prevent uneven tire wear and improve your car's handling and fuel economy.
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Precision guaranteed
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-green-100" data-testid="card-service-general">
              <div className="text-green-600 text-3xl mb-4">
                <Wrench className="w-12 h-12" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Oil Change & Maintenance</h4>
              <p className="text-gray-600 mb-4">
                Complete oil change service with filter replacement and comprehensive 21-point vehicle inspection.
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Quick & reliable
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-indigo-100" data-testid="card-service-custom">
              <div className="text-indigo-600 text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">AC & Heating Service</h4>
              <p className="text-gray-600 mb-4">
                Complete air conditioning and heating system repair, recharge, and maintenance for year-round comfort.
              </p>
              <div className="flex items-center text-indigo-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                </svg>
                Climate control experts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Trusted Auto Repair Since 1986</h3>
              <p className="text-lg text-gray-600 mb-6">
                For nearly four decades, Dearborn Heights Auto Clinic has been the trusted choice for automotive 
                repair and maintenance in Michigan. Our experienced technicians provide professional service you can count on.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center" data-testid="info-location">
                  <div className="bg-automotive-blue/10 p-3 rounded-lg mr-4">
                    <MapPin className="text-automotive-blue w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Our Location</div>
                    <div className="text-gray-600">4843 S Telegraph Rd, Dearborn Heights, MI 48125</div>
                  </div>
                </div>

                <div className="flex items-center" data-testid="info-phone">
                  <div className="bg-automotive-blue/10 p-3 rounded-lg mr-4">
                    <Phone className="text-automotive-blue w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Contact Numbers</div>
                    <div className="text-gray-600">
                      (313) 292-5120 | (313) 292-5121
                    </div>
                  </div>
                </div>

                <div className="flex items-center" data-testid="info-hours">
                  <div className="bg-automotive-blue/10 p-3 rounded-lg mr-4">
                    <Clock className="text-automotive-blue w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Business Hours</div>
                    <div className="text-gray-600">
                      Mon-Fri: 8:00 AM - 6:00 PM<br/>
                      Sat: 9:00 AM - 3:00 PM<br/>
                      Sun: Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=700" 
                alt="Professional auto repair shop exterior" 
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="img-shop-exterior"
              />
              
              <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-lg p-4 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div data-testid="stat-experience">
                    <div className="text-2xl font-bold text-automotive-blue">39+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div data-testid="stat-rating">
                    <div className="text-2xl font-bold text-automotive-blue flex items-center justify-center">
                      5<Star className="w-5 h-5 ml-1" />
                    </div>
                    <div className="text-sm text-gray-600">Customer Rating</div>
                  </div>
                  <div data-testid="stat-service">
                    <div className="text-2xl font-bold text-automotive-blue">24/7</div>
                    <div className="text-sm text-gray-600">Emergency Service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="booking" className="py-16 bg-automotive-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Schedule Your Appointment?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Choose between shop service or mobile repair at your location. Professional automotive care since 1986.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button 
                className="bg-white text-automotive-blue px-8 py-3 hover:bg-gray-100 text-lg"
                data-testid="button-schedule-appointment"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Appointment
              </Button>
            </Link>
            <a 
              href="tel:3132925120" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-automotive-blue transition-colors inline-flex items-center justify-center"
              data-testid="link-call-direct"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (313) 292-5120
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Wrench className="w-8 h-8 text-accent mr-3" />
                <div>
                  <h4 className="text-xl font-bold">Dearborn Heights Auto Clinic</h4>
                  <p className="text-gray-400 text-sm">Professional Auto Repair Since 1986</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Trusted automotive repair and mobile services throughout Dearborn Heights and surrounding Michigan areas.
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Contact Information</h5>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>4843 S Telegraph Rd<br/>Dearborn Heights, MI 48125</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3" />
                  <a href="tel:3132925120" className="hover:text-accent transition-colors">
                    (313) 292-5120
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3" />
                  <a href="tel:3132925121" className="hover:text-accent transition-colors">
                    (313) 292-5121
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Business Hours</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                <div className="text-accent font-semibold text-sm">Emergency Service Available</div>
                <div className="text-gray-400 text-sm">Call for urgent automotive needs</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Dearborn Heights Auto Clinic. All rights reserved. | Professional automotive services since 1986</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
