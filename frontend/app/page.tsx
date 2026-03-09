'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Home, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import RequestCard from '@/components/RequestCard';
import AgentCard from '@/components/AgentCard';
import ServiceCard from '@/components/ServiceCard';
import { allProperties } from '@/data/properties';
import { allRequests } from '@/data/requests';
import { allAgents } from '@/data/agents';
import { allServices } from '@/data/services';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    switch (user?.role) {
      case Role.ADMIN:
        return '/admin';
      case Role.AGENT:
        return '/dashboard/agent-profile';
      case Role.SERVICE_PROVIDER:
        return '/provider/dashboard';
      case Role.USER:
      default:
        return '/dashboard';
    }
  };

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
                <Link href="/dashboard/properties/form">
                  <Button className="h-12 px-8 rounded-full text-sm font-semibold shadow-sm">
                    Post Property
                  </Button>
                </Link>
                {isAuthenticated && (
                  <Link href={getDashboardLink()}>
                    <Button variant="outline" className="h-12 px-8 rounded-full text-sm font-semibold shadow-sm border-slate-200">
                      Go to Dashboard
                    </Button>
                  </Link>
                )}
                <Link href="/agents" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors ml-2">
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
            {allProperties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.image}
                price={property.price}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                address={property.address}
                status={property.status}
                featured={property.featured}
                description={property.description}
                propertyType={property.propertyType}
                latitude={property.latitude}
                longitude={property.longitude}
              />
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
            {allRequests.slice(0, 3).map((request) => (
              <RequestCard
                key={request.id}
                id={request.id}
                type={request.type}
                title={request.title}
                location={request.location}
                budget={`${request.budgetMin} - ${request.budgetMax}`}
                timeline={request.timeline}
                user={request.user}
                posted={request.postedDate}
              />
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
            {allAgents.slice(0, 3).map((agent) => (
              <AgentCard
                key={agent.id}
                id={agent.id}
                name={agent.name}
                agency={agent.agency}
                experience={agent.experience}
                specialization={agent.specialization}
                serviceAreas={agent.serviceAreas}
                verified={agent.verified}
                image={agent.image}
              />
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

          <div className="grid md:grid-cols-3 gap-6">
            {allServices.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                type={service.type}
                location={service.location}
                experience={service.experience}
                verified={service.verified}
                phone={service.phone}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground max-w-2xl">
              Need help assembling the right team for your transaction? Tell us what you&apos;re working on and we&apos;ll match you with the right experts within 24 hours.
            </p>
            <Link href="/contact">
              <Button className="rounded-full bg-slate-900 px-8 py-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-800">
                Meet our services concierge
              </Button>
            </Link>
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
