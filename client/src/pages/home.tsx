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
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow" data-testid="card-service-mobile">
              <div className="text-automotive-blue text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Mobile Auto Repair</h4>
              <p className="text-gray-600 mb-4">
                We come to you! Professional mobile repair services at your location throughout Dearborn Heights area.
              </p>
              <div className="text-accent font-medium">On-site service available</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow" data-testid="card-service-brakes">
              <div className="text-automotive-blue text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 13H6v-2h2v2zm0-4H6V7h2v2zm4 4h-2v-2h2v2zm0-4h-2V7h2v2zm4 4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Brake Services & Repairs</h4>
              <p className="text-gray-600 mb-4">
                Complete brake system diagnostics, repairs, and replacements for all vehicle makes and models.
              </p>
              <div className="text-accent font-medium">Safety first approach</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow" data-testid="card-service-engine">
              <div className="text-automotive-blue text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Engine Repair & Diagnostics</h4>
              <p className="text-gray-600 mb-4">
                Advanced diagnostic equipment and expert engine repair services for optimal vehicle performance.
              </p>
              <div className="text-accent font-medium">Latest diagnostic tools</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow" data-testid="card-service-alignment">
              <div className="text-automotive-blue text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Wheel Alignment</h4>
              <p className="text-gray-600 mb-4">
                Precision wheel alignment services to ensure proper tire wear and vehicle handling.
              </p>
              <div className="text-accent font-medium">Precision guaranteed</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow" data-testid="card-service-general">
              <div className="text-automotive-blue text-3xl mb-4">
                <Wrench className="w-12 h-12" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">General Automotive Repair</h4>
              <p className="text-gray-600 mb-4">
                Comprehensive automotive maintenance and repair services for all your vehicle needs.
              </p>
              <div className="text-accent font-medium">Complete solutions</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow" data-testid="card-service-custom">
              <div className="text-automotive-blue text-3xl mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Custom Auto Work</h4>
              <p className="text-gray-600 mb-4">
                Specialized custom automotive work and modifications to meet your unique requirements.
              </p>
              <div className="text-accent font-medium">Personalized service</div>
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
