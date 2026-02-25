'use client';

import Link from 'next/link';
import { MapPin, ArrowRight, BedDouble, Bath, Ruler } from 'lucide-react';

interface PropertyCardProps {
  id: number;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  address: string;
  status: string;
  featured: boolean;
  description: string;
  propertyType: string;
  latitude?: number;
  longitude?: number;
}

const PropertyCard = ({ 
  id, 
  image, 
  price, 
  beds, 
  baths, 
  sqft, 
  address, 
  status, 
  featured, 
  description,
  propertyType,
  latitude,
  longitude 
}: PropertyCardProps) => {
  return (
    <Link
      href={`/properties/${id}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="bg-white rounded-[32px] overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5)]">
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={propertyType}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden="true"></div>
          {featured && (
            <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg">
              Featured
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2 text-slate-900">
              <span className="text-3xl font-semibold tracking-tight">{price}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {propertyType}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {address}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <BedDouble className="w-4 h-4 text-muted-foreground" />
              {beds} bd
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Bath className="w-4 h-4 text-muted-foreground" />
              {baths} bt
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              {sqft} sq ft
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white shadow-sm transition-all group-hover:bg-slate-800">
              View details
            </span>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold bg-primary/10 text-primary">
              {status}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;
