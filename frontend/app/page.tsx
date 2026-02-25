import React from 'react';
import Link from 'next/link';
import { Search, MapPin, Home, Users, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mt-16 pt-16 pb-16 px-6 md:px-8 bg-background relative overflow-hidden">
        {/* Subtle decorative background - B2B SaaS style */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
                Find Your Perfect Property
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Discover dream homes, connect with verified agents, and transform your real estate journey with our modern platform.
              </p>

              {/* Search Bar */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full pl-12 pr-4 h-12 bg-background border border-border rounded-lg text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <Button className="px-8 h-12 rounded-lg font-medium shadow-sm transition-transform active:scale-[0.98]">Search</Button>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/properties">
                  <Button variant="default" className="gap-2 h-10 px-6 rounded-lg font-medium">
                    Browse Properties
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/map">
                  <Button variant="outline" className="h-10 px-6 rounded-lg font-medium">
                    View on Map
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="hidden md:flex justify-end relative">
              <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-sm relative group">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=600&fit=crop"
                  alt="Modern Luxury Home"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 md:px-8 bg-background border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2,450+', label: 'Properties Listed' },
              { number: '890+', label: 'Active Requests' },
              { number: '450+', label: 'Verified Agents' },
              { number: '180K+', label: 'Happy Users' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-4xl font-bold text-foreground tracking-tight">{stat.number}</div>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Featured Properties</h2>
              <p className="text-muted-foreground">Handpicked homes from our top agents</p>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="gap-2 rounded-lg text-sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Property Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "Luxury Downtown Apartment",
                location: "Business District, Mumbai",
                price: "$850,000",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
                beds: 3,
                baths: 2,
                sqft: "1,850"
              },
              {
                id: 2,
                title: "Modern Family Villa",
                location: "Suburbs, Bangalore",
                price: "$1,250,000",
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
                beds: 4,
                baths: 3,
                sqft: "2,400"
              },
              {
                id: 3,
                title: "Cozy Studio Loft",
                location: "City Center, Delhi",
                price: "$425,000",
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
                beds: 1,
                baths: 1,
                sqft: "650"
              }
            ].map((property) => (
              <Link key={property.id} href={`/properties/${property.id}`} className="group outline-none">
                <div className="bg-card rounded-xl overflow-hidden shadow-xs hover:shadow-sm border border-border transition-all duration-300 flex flex-col h-full ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-xs font-semibold text-foreground">Featured</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </p>
                    
                    {/* Property Details */}
                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <span>{property.beds} Beds</span>
                      <span>{property.baths} Baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
                      <span className="text-xl font-bold text-foreground tracking-tight">{property.price}</span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Why Choose RealProperty?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need for a seamless real estate experience, designed for modern workflows.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Search,
                title: 'Advanced Search',
                description: 'Filter by location, price, amenities, and more. Find exactly what you are looking for in seconds.',
              },
              {
                icon: Users,
                title: 'Expert Agents',
                description: 'Connect with verified, experienced professionals who know the local market inside and out.',
              },
              {
                icon: Zap,
                title: 'Fast Process',
                description: 'Streamlined transactions from listing to closing. Goodbye paperwork, hello efficiency.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex flex-col relative group">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 border border-border group-hover:border-primary/50 transition-colors">
                    <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from real people who found their dream properties through our platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "First-time Homebuyer",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                content: "Found my perfect apartment in just 2 weeks! The platform made everything so easy and the agents were incredibly helpful.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Property Investor",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                content: "Best real estate platform I've used. The search filters are powerful and saved me hours of work. Highly recommend!",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Relocating Family",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                content: "As a family moving to a new city, this platform made our transition smooth. Found a beautiful home in a great school district.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Rating Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-8 bg-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground tracking-tight">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
            Join thousands of users finding their perfect property today with our modern platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 rounded-lg h-12 px-8 font-medium">
                Create Free Account
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-lg h-12 px-8 bg-transparent font-medium">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
