import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Home,
  Users,
  ArrowRight,
  CheckCircle2,
  BedDouble,
  Bath,
  Ruler,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mt-8 px-6 md:px-8 pt-16 pb-14 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
          
                <h1 className="text-5xl md:text-[4.25rem] font-semibold text-foreground leading-[1.05] tracking-tight">
                  Find a place you will call home
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  With us you will find not just accommodation, but a place where your new life begins—full of comfort, character, and possibilities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Button className="h-12 px-8 rounded-full text-sm font-semibold shadow-sm">
                  Post Property
                </Button>
                <Link href="/properties" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  Find Agent
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-2">
                {[
                  { label: 'Premium homes', value: '2.4K+' },
                  { label: 'Cities covered', value: '35+' },
                  { label: 'Happy clients', value: '18K+' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                    <div>
                      <p className="text-xl font-semibold text-foreground">{item.value}</p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/60">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&h=750&fit=crop"
                  alt="Contemporary luxury villa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" aria-hidden="true"></div>
              </div>

              <div className="absolute -bottom-8 left-8 bg-background/90 backdrop-blur-sm rounded-2xl border border-border px-6 py-5 shadow-xl hidden md:flex flex-col gap-3 w-[min(85%,260px)]">
                <p className="text-sm font-medium text-muted-foreground">Featured residence</p>
                <p className="text-lg font-semibold text-foreground">Skyline Retreat, Pune</p>
                <div className="text-sm text-muted-foreground">
                  4 Beds · 3 Baths · 3,200 sqft
                </div>
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
                price: "₹85L",
                paymentTerm: "sale",
                tagline: "Sunlit premium apartment with skyline views and concierge amenities.",
                status: { label: "Available", tone: "bg-emerald-100 text-emerald-600" },
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=420&fit=crop",
                beds: 3,
                baths: 2,
                sqft: "1,850"
              },
              {
                id: 2,
                title: "Modern Family Villa",
                location: "Suburbs, Bangalore",
                price: "₹1.25Cr",
                paymentTerm: "sale",
                tagline: "Gated community villa with private garden and smart home systems.",
                status: { label: "New Listing", tone: "bg-sky-100 text-sky-600" },
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=420&fit=crop",
                beds: 4,
                baths: 3,
                sqft: "2,400"
              },
              {
                id: 3,
                title: "Cozy Studio Loft",
                location: "City Center, Delhi",
                price: "₹38L",
                paymentTerm: "sale",
                tagline: "Scandinavian-inspired loft perfect for young professionals.",
                status: { label: "Open House", tone: "bg-amber-100 text-amber-600" },
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=420&fit=crop",
                beds: 1,
                baths: 1,
                sqft: "650"
              }
            ].map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <article className="bg-white rounded-[32px] overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5)]">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden="true"></div>
                    <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg">
                      Featured Home
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2 text-slate-900">
                        <span className="text-3xl font-semibold tracking-tight">{property.price}</span>
                        {property.paymentTerm && (
                          <span className="text-sm font-medium text-muted-foreground">/{property.paymentTerm}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{property.tagline}</p>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {property.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                        <BedDouble className="w-4 h-4 text-muted-foreground" />
                        {property.beds} bd
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                        <Bath className="w-4 h-4 text-muted-foreground" />
                        {property.baths} bt
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                        <Ruler className="w-4 h-4 text-muted-foreground" />
                        {property.sqft} sq ft
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white shadow-sm transition-all group-hover:bg-slate-800">
                        View details
                      </span>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${property.status.tone}`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current"></span>
                        {property.status.label}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Requests Section */}
      <section className="py-16 px-6 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Recent Requests</h2>
              <p className="text-muted-foreground">Latest property requests from buyers and investors</p>
            </div>
            <Link href="/requests">
              <Button variant="outline" className="gap-2 rounded-lg text-sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                type: "Buy",
                budget: "$800K - $1.2M",
                location: "South Mumbai",
                propertyType: "3BHK Apartment",
                timeline: "Within 3 months",
                status: "Open"
              },
              {
                id: 2,
                type: "Rent",
                budget: "$2K - $3K/month",
                location: "Koramangala, Bangalore",
                propertyType: "2BHK Furnished",
                timeline: "Immediate",
                status: "Open"
              },
              {
                id: 3,
                type: "Investment",
                budget: "$5M+",
                location: "Gurgaon",
                propertyType: "Commercial Space",
                timeline: "6 months",
                status: "Open"
              }
            ].map((request) => (
              <Link
                key={request.id}
                href={`/requests/${request.id}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <article className="bg-white rounded-[32px] p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.35)] border border-border/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.45)]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                      {request.type} Request
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-current"></span>
                      {request.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {request.propertyType}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {request.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-muted/30 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Budget</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{request.budget}</p>
                      </div>
                      <div className="rounded-2xl bg-muted/30 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Timeline</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{request.timeline}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-xs font-medium text-muted-foreground">Tap to view request details</span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-all group-hover:bg-slate-800 group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents Section */}
      <section className="py-16 px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Verified Agents</h2>
              <p className="text-muted-foreground">Experienced professionals ready to help you find your perfect property</p>
            </div>
            <Link href="/agents">
              <Button variant="outline" className="gap-2 rounded-lg text-sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: "Rajesh Kumar",
                agency: "Premium Properties",
                experience: "8 years",
                specialization: "Luxury Homes",
                serviceAreas: "South Mumbai",
                verified: true,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              },
              {
                id: 2,
                name: "Priya Sharma",
                agency: "Urban Realty",
                experience: "5 years",
                specialization: "Commercial Properties",
                serviceAreas: "Bangalore Central",
                verified: true,
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              },
              {
                id: 3,
                name: "Amit Patel",
                agency: "Metro Homes",
                experience: "12 years",
                specialization: "Investment Properties",
                serviceAreas: "Gurgaon & Noida",
                verified: true,
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              }
            ].map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <article className="bg-white rounded-[32px] p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.35)] border border-border/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.45)]">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-primary/10 shadow-lg">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="h-full w-full  object-cover"
                        />
                      </div>
                      {agent.verified && (
                        <div className="absolute -bottom-2 -right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-sm font-medium text-primary/80">{agent.agency}</p>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{agent.serviceAreas}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full">
                      <div className="rounded-2xl bg-muted/30 px-3 py-3">
                        <Users className="mx-auto mb-2 h-5 w-5 text-primary" />
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Experience</p>
                        <p className="text-sm font-semibold text-slate-900">{agent.experience}</p>
                      </div>
                      <div className="rounded-2xl bg-muted/30 px-3 py-3">
                        <Home className="mx-auto mb-2 h-5 w-5 text-primary" />
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Specialty</p>
                        <p className="text-sm font-semibold text-slate-900">{agent.specialization}</p>
                      </div>
                      <div className="rounded-2xl bg-muted/30 px-3 py-3">
                        <MapPin className="mx-auto mb-2 h-5 w-5 text-primary" />
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Service</p>
                        <p className="text-sm font-semibold text-slate-900">{agent.serviceAreas}</p>
                      </div>
                    </div>

                    <span className="inline-flex h-11 w-full items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white shadow-sm transition-all group-hover:bg-slate-800">
                      View profile
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="py-20 px-6 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col items-center text-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Services network
            </span>
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                The experts behind every successful deal
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Work with vetted professionals who understand the nuances of property transactions—finance, legal, compliance, and more.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                service: "CA",
                count: "45+",
                image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600&h=400&fit=crop",
                description: "Tax planning, audits, and investment structuring for property portfolios.",
              },
              {
                service: "Lawyer",
                count: "32+",
                image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=600&h=400&fit=crop",
                description: "Title checks, contracts, and end-to-end legal compliance for deals.",
              },
              {
                service: "CS",
                count: "28+",
                image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
                description: "Corporate structuring and governance support for developers and investors.",
              },
              {
                service: "Notary",
                count: "18+",
                image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&h=400&fit=crop",
                description: "Instant document attestation and certified copies across cities.",
              },
              {
                service: "Loan Advisor",
                count: "56+",
                image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&h=400&fit=crop",
                description: "Financing strategies and bank liaison for residential and commercial loans.",
              },
            ].map((service) => (
              <Link
                key={service.service}
                href="/services"
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/50 bg-white/95 shadow-[0_25px_50px_-30px_rgba(15,23,42,0.4)] transition-all duration-500 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_35px_70px_-35px_rgba(15,23,42,0.45)]">
                  <div className="relative h-32 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.service} professionals`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden="true"></div>
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-4 px-6 pb-6 pt-5 text-center">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.service}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                        {service.count} Specialists
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all group-hover:bg-slate-800">
                      Connect now
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground max-w-2xl">
              Need help assembling the right team for your transaction? Tell us what you&apos;re working on and we&apos;ll match you with the right experts within 24 hours.
            </p>
            <Button className="rounded-full bg-slate-900 px-8 py-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-800">
              Meet our services concierge
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Preview */}
      <section className="py-16 px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Interactive Map</h2>
              <p className="text-muted-foreground">Explore properties and requests on our interactive map</p>
            </div>
            <Link href="/map">
              <Button variant="outline" className="gap-2 rounded-lg text-sm">
                Open Map
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
              <div className="relative z-10 text-center space-y-4">
                <MapPin className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">Interactive Map View</h3>
                <p className="text-muted-foreground max-w-md">
                  View properties, requests, and agents on an interactive map with advanced filtering options
                </p>
                <Link href="/map">
                  <Button className="rounded-full">
                    Launch Map
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
